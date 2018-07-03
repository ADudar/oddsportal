/**
 * tooltip object
 */
class Tooltip {

    /**
     * set locators
     */
    constructor() {
        /**
         * selector tooltip history bets for event
         * @type {string}
         * @private
         */
        this._historyBets = '#tooltiptext strong:not(:last-of-type)';

        /**
         * selector tooltip opening odds event
         * @type {string}
         * @private
         */
        this._openingBets = '#tooltiptext strong:last-of-type';
    }

    /**
     * getter odds history array
     * @returns {*|T[]|jQuery}
     */
    get historyBets() {
        return $(this._historyBets).map((i, v) => +v.innerText).toArray();
    }

    /**
     * getter opening odds
     * @returns {number}
     */
    get openingBets() {
        const lastBet = +$(this._openingBets).text();
        return lastBet ? lastBet : +$(this._openingBets).prevAll('strong').first().text();
    }
}