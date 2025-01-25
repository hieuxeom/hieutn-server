const ResponseMessage = {
	successGetAll: (resource) => `Successfully fetched ${resource}`,
	successGetOne: (resource) => `Successfully fetched ${resource} details`,
	successCreate: (resource) => `Successfully created new ${resource}`,
	successUpdate: (resource) => `Successfully updated ${resource}`,
	successDelete: (resource) => `Successfully deleted ${resource}`,
	successRecover: (resource) => `Successfully recovered ${resource}`,
	alreadyInSoftDelete: (resource) => `${resource} is already in soft delete status`,
	notInSoftDelete: (resource) => `${resource} is not in soft delete status`,
	notMatch: (resource1, resource2) => `${resource2} does not match ${resource1}`,
	passwordNotStrongEnough: "Password is not strong enough",
	emailAlreadyExist: "Email already exist",
	signUpSuccess: "Account created successfully",
	emailNotFound: "No account found with the email provided",
	userIdNotFound: "No account found with the user_id provided",
	wrongRefreshToken: "The refresh token you provided doesn't match the refresh token on the server.",
	successGetNewAccessToken: `Successfully generated new access token`,
	passwordNotMatch: "Wrong password",
	signInSuccess: "Successfully signed in",
}

module.exports = ResponseMessage;