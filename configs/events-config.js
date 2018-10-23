/**
 * Filter events config
 */
class EventsConfig {

    /**
     * events with no bets
     * @returns {boolean}
     */
    static get skipNoBetsEvents() {
        return true;
    }

    /**
     * events with scores
     * @returns {boolean}
     */
    static get skipResultsWithScores() {
        return true;
    }

    /**
     * live events
     * @returns {boolean}
     */
    static get skipLiveEvents() {
        return true;
    }

    /**
     * Doubles events
     * @returns {boolean}
     */
    static get skipDoublesEvents() {
        return true;
    }

    constructor() {
        /**
         * ITF events
         * @returns {boolean}
         */
        this.skipITFEvents = true;
        /**
         * WTA events
         * @returns {boolean}
         */
        this.skipWTAEvents = true;
        /**
         * Men events
         * @returns {boolean}
         */
        this.skipMenEvents = false;
    }
}