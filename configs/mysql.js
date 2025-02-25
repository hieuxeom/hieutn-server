const mysql = require("mysql2");
const mysqlPromise = require("mysql2/promise");


class MySQL {
	createConnection() {
		return mysql.createConnection({
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE
		})
	}

	async createPromiseConnection(isMultipleStatements = false) {
		return mysqlPromise.createConnection({
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			multipleStatements: isMultipleStatements
		});
	}

	async query(sqlString, values = []) {
		try {
			if (!Array.isArray(values)) {
				return {
					isCompleted: false,
					message: "Values must be an array",
					results: []
				}
			}

			if (sqlString.includes(";") && sqlString.split(";").length >= 2) {
				return {
					isCompleted: false,
					message: "Only 1 statement is allowed",
					results: []
				}
			}

			const connection = await this.createPromiseConnection(false);
			const [rows, fields] = await connection.query(sqlString, values);

			await connection.end();

			return {
				isCompleted: true,
				results: rows
			}

		} catch (error) {

			console.log("Error in mysql queryOne", error.code);
			console.log(error)

			if (typeof error !== 'string') {

				if (error.code === "ER_DUP_ENTRY") {
					return {
						isCompleted: false,
						message: error.code,
						results: [],
					}
				}

				return {
					isCompleted: false,
					message: error.code,
					results: [],
				}
			}

			return {
				isCompleted: false,
				message: error.code,
				results: [],
			}
		}
	}

	async queryMany(sqlString, values = []) {
		try {
			if (!Array.isArray(values)) {
				return {
					isCompleted: false,
					message: "Values must be an array",
					results: []
				}
			}

			const connection = await this.createPromiseConnection(true);
			const [rows, fields] = await connection.query(sqlString, values);

			await connection.end();

			return {
				isCompleted: true,
				results: rows
			}

		} catch (error) {
			if (typeof error !== 'string') {
				return {
					isCompleted: false,
					message: error.message,
					results: [],
				}
			}

			return {
				isCompleted: false,
				message: error,
				results: [],
			}
		}
	}
}

module.exports = new MySQL();
