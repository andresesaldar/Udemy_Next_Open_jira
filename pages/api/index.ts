export class HttpException extends Error {
	readonly statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestException extends HttpException {
	constructor() {
		super(400, "Bad Request");
	}
}
