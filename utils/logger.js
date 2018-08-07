/**
 * logger class
 */
class Logger {

    /**
     * console log
     * @type {boolean}
     */
    static get LOG_ENABLED() {
        return true;
    }

    /**
     * alert
     * @type {boolean}
     */
    static get ALERT_ENABLED() {
        return false;
    }

    /**
     * debugger
     * @type {boolean}
     */
    static get DEBUG_ENABLED() {
        return false;
    }

    /**
     * log function alert and console
     * @param message
     * @param data
     */
    static log(message, data) {
        if (Logger.LOG_ENABLED) {
            console.log(message, data);
        }
        if (Logger.ALERT_ENABLED) {
            alert(message);
        }
        if (Logger.DEBUG_ENABLED) {
            debugger;
        }
    }
}