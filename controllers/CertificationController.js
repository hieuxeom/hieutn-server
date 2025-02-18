const BaseController = require("./BaseController")
const CertificationService = require("../services/CertificationService");


class CertificationController extends BaseController {
	constructor() {
		super();
	}

	async getAll(req, res, next) {
		try {

			const { isCompleted, message, results } = await CertificationService.getAll();

			if (!isCompleted) {
				return super.createResponse(res, 400, message)
			}

			return super.createResponse(res, 200, message, results)

		} catch (error) {
			return super.createResponse(res, 500, error)
		}
	}

	async addNewCertification(req, res, next) {

		try {

			const { isCompleted, message, results } = await CertificationService.addNewCertification(req.body, req.file)

			if (!isCompleted) {
				return super.createResponse(res, 400, message)
			}

			return super.createResponse(res, 200, message, results)
		} catch (error) {
			return super.createResponse(res, 500, error)
		}
	}

	async getCertificationDetails(req, res, next) {
		try {
			const { certId } = req.params;

			const { isCompleted, message, results } = await CertificationService.getCertificationDetails(certId, true);

			if (!isCompleted) {
				return super.createResponse(res, 400, message)
			}

			return super.createResponse(res, 200, message, results)

		} catch (error) {
			return super.createResponse(res, 500, error)
		}
	}

	async updateCertification(req, res, next) {
		try {

			const { certId } = req.params;

			const {
				isCompleted,
				message,
			} = await CertificationService.updateCertification(certId, req.body, req.file)

			if (!isCompleted) {
				return super.createResponse(res, 400, message)
			}

			return super.createResponse(res, 200, message || "test")

		} catch (error) {
			return super.createResponse(res, 500, error)
		}
	}

	async softDeleteCertification(req, res, next) {
		try {

			const { certId } = req.params

			const { isCompleted, message } = await CertificationService.softDeleteCertification(certId);

			if (!isCompleted) {
				return super.createResponse(res, 400, message)
			}

			return super.createResponse(res, 200, message)

		} catch (error) {
			return super.createResponse(res, 500, error)
		}
	}

	async recoverCertification(req, res, next) {
		try {

			const { certId } = req.params

			const { isCompleted, message } = await CertificationService.recoverCertification(certId);

			if (!isCompleted) {
				return super.createResponse(res, 400, message)
			}

			return super.createResponse(res, 200, message)


		} catch (error) {
			return super.createResponse(res, 500, error)
		}
	}

	async permanentDeleteCertification(req, res, next) {
		try {

			const { certId } = req.params;

			const { isCompleted, message } = await CertificationService.permanentDeleteCertification(certId);

			if (!isCompleted) {
				return super.createResponse(res, 400, message)
			}

			return super.createResponse(res, 200, message)

		} catch (error) {
			return super.createResponse(res, 500, error)
		}
	}


}

module.exports = new CertificationController();