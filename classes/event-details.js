/**
 * event details object
 */
class EventDetails {

    constructor() {
        /**
         * all average bets selector
         * @type {string}
         */
        this.betsSelector = '.table-container:first-child tr .odds [onmouseover]';
    }

    /**
     * getter all average bets
     * @returns {*|jQuery|HTMLElement}
     */
    get bets() {
        return this._bets ? this._bets : this._bets = $(this.betsSelector);
    }

    /**
     * getter max bet first event
     * @returns {number}
     */
    get maxBet1() {
        return this.getmaxBet(0);

    }

    /**
     * getter max bet second event
     * @returns {number}
     */
    get maxBet2() {
        return this.getmaxBet(1);
    }

    /**
     * get max bet from event's tooltip by index bet
     * @param num
     * @returns {number}
     */
    getmaxBet(num) {
        this.bets.get(num).dispatchEvent(new Event('mouseover'));
        const coeffs = new Tooltip().coeffs;
        return Math.max(...coeffs);
    }

    /**
     * getter first event current bet
     * @returns {*}
     */
    get currentBet1() {
        return this.getCurrentBet(0);
    }

    /**
     * getter second event current bet
     * @returns {*}
     */
    get currentBet2() {
        return this.getCurrentBet(1);
    }

    /**
     * get current bet value by index
     * @param num
     */
    getCurrentBet(num) {
        return +this.bets.eq(num).text();
    }
}