class BadRequestError extends Error {
	constructor(message, details) {
		super(message);
		this.name = this.constructor.name;
		this.details = details;
	}
}
module.exports = BadRequestError;