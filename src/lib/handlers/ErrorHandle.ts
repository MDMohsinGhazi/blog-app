abstract class ErrorHandler {
    protected defaultErrorCode = 409;
    protected errorObject: Record<string, any> | string | null;

    constructor(error: Record<string, any> | string | null) {
        console.log('Actual Error:', error);
        this.errorObject = error;
    }

    // Method to safely retrieve an error code with a fallback to defaultErrorCode
    protected getErrorCodeOrDefault(): number {
        if (this.errorObject && typeof this.errorObject === 'object' && 'code' in this.errorObject) {
            return Number(this.errorObject['code']) || this.defaultErrorCode;
        }
        return this.defaultErrorCode;
    }

    get getErrorCode(): string {
        const errorCode = this.getErrorCodeOrDefault();
        return String(errorCode);
    }

    // Default error message, can be overridden in subclasses
    get getErrorMessage(): string {
        return 'An error occurred'; // Generic fallback message
    }

    get getErrorDetails(): Record<string, string> | null {
        return null; // Default implementation, override in subclasses if needed
    }
}

export class APIErrorHandler extends ErrorHandler {
    constructor(error: Record<string, any> | string | null) {
        super(error);
    }

    // Getter for API-specific error message
    get getErrorMessage(): string {
        if (this.errorObject && typeof this.errorObject === 'object') {
            const errorMessage = this.errorObject['message'];
            return errorMessage ? String(errorMessage) : 'Unknown error occurred';
        }
        return 'Invalid error object'; // Handles case where errorObject is a string or null
    }

    // Getter for detailed errors if provided
    get getErrorDetails(): Record<string, string> | null {
        if (this.errorObject && typeof this.errorObject === 'object') {
            const errorDetails = this.errorObject['errors'];
            return errorDetails || null; // Null if errors is undefined or not provided
        }
        return null; // Handles cases where errorObject is a string or null
    }

    // Getter for status code or fallback to default
    get getErrorStatus(): string {
        if (this.errorObject && typeof this.errorObject === 'object') {
            const errorStatus = this.errorObject['status'];
            return errorStatus ? String(errorStatus) : 'No status available';
        }
        return 'No status available';
    }
}
