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
     * ITF events
     * @returns {boolean}
     */
    static get skipITFEvents() {
        return true;
    }

    /**
     * WTA events
     * @returns {boolean}
     */
    static get skipWTAEvents() {
        return true;
    }

    /**
     * Doubles events
     * @returns {boolean}
     */
    static get skipDoublesEvents() {
        return true;
    }
}