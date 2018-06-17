/**
 * event details object
 */
class EventDetails {

    constructor() {
        /**
         * all average bets selector
         * @type {string}
         */
        this.betsSelector = '.table-container:first-child .odds [onmouseover]';
        this.bookmakersSelector = `.table-container:first-child .lo .name2[href*='{0}']`;
    }

    /**
     * getter all average bets
     * @returns {*|jQuery|HTMLElement}
     */
    getBets(bookmakerName = 'pinnacle') {
        if (this._bb && this._bb.length) {
            return this._bb;
        }
        const bb = $(this.bookmakersSelector.replace('{0}', bookmakerName));
        if (bb && bb.length) {
            this._bb = bb.parent().parent().nextAll('.odds').map((i,el) => $(el).find('[onmouseover]').get());
            return this._bb;
        }
        if (this._bets) {
            return this._bets;
        }
        const bets = $(this.betsSelector).slice(0,2);
        debugger;
        this._bets = bets;
        return bets;
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
        this.getBets().get(num).dispatchEvent(new Event('mouseover'));
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
        return +this.getBets().eq(num).text();
    }
}