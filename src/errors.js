/**
 * Contains all the message errors.
 *
 * @param {object}
 */
export const ERRORS = {
    undefined: {
        configObject: `Configuration object must be provided`,
        order: `Configuration key 'order' must be provided`,
    },
}

/**
 * Handles the errors thrown through the library.
 */
export class ErrorHandler {
    /**
     * Returns the propper error console message.
     *
     * @param {object} error
     */
    static handle(error) {
        let stackErrorLine = this.getStackLine(error.stack)
        let errorMessage = `zIndex: ${error.message}\nError ${stackErrorLine}`

        return console.warn(errorMessage)
    }

    /**
     * Returns the specific Error stack line.
     *
     * @param {string} stack
     */
    static getStackLine(stack) {
        let stackLines = stack.split('\n')

        return stackLines[3].trim()
    }
}
