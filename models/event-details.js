/**
 * bookmakers list object
 * @type {{Pinnacle: string}}
 */
const BOOKMAKERS = {
    Pinnacle: 'pinnacle',
    BetAtHome: 'bet-at-home'
};

/**
 * event details object
 */
class EventDetails {

    /**
     * DI event details
     * @param bookmakerName which bookmaket get bets
     */
    constructor(bookmakerName = BOOKMAKERS.Pinnacle) {
        this.bookmakerName = bookmakerName;
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
    getBets() {
        return this.bookmakerBets || this.firstBets;
    }

    /**
     * getter bookmaker locator by name
     * @returns {string}
     */
    get bookmakerLocator() {
        return this.bookmakersSelector.replace('{0}', this.bookmakerName);
    }

    /**
     * getter cached selected bookmaker bets
     * @returns {*|Uint8Array|(*|jQuery)[]|Int32Array|Uint16Array}
     */
    get cachedBookmakerBets() { // get cached bookmaker bets
        return this._bb;
    }

    /**
     * getter selected bookmaker bets
     * @returns {*}
     */
    get bookmakerBets() { // get selected bookmaker bets
        return this.cachedBookmakerBets ? this.cachedBookmakerBets :
            $(this.bookmakerLocator).length ?
                this._bb = $(this.bookmakerLocator).parent().parent().nextAll('.odds')
                    .map((i, el) => $(el).find('[onmouseover]').get()) : null;
    }

    /**
     * getter bookmaker name
     * @returns {string|*}
     */
    get bookmaker() {
        return $(this.bookmakerLocator).length ? this.bookmakerName : this.firstBookmakerName;
    }

    /**
     * getter first bookmaker name
     * @returns {string}
     */
    get firstBookmakerName() {
        return this.firstBets.first().parent().prev().text().trim().toLowerCase();
    }

    /**
     * getter cached first bookmaker bets
     * @returns {Buffer|*|T[]|SharedArrayBuffer|Uint8ClampedArray|Uint32Array}
     */
    get cachedFirstBets() {  // get cached first bets
        return this._bets;
    }

    /**
     * getter first bookmaker bets
     * @returns {*}
     */
    get firstBets() { // get first bets
        return this.cachedFirstBets ? this.cachedFirstBets : this._bets = $(this.betsSelector).slice(0, 2);
    }

    /**
     * getter max bet first event
     * @returns {number}
     */
    get maxHistoryBet1() {
        return this.getMaxHistoryBet(0);

    }

    /**
     * getter max bet second event
     * @returns {number}
     */
    get maxHistoryBet2() {
        return this.getMaxHistoryBet(1);
    }

    /**
     * get max bet from event's tooltip by index bet
     * @param num
     * @returns {number}
     */
    getMaxHistoryBet(num) {
        this.getBets().get(num).dispatchEvent(new Event('mouseover'));
        const historyBets = new Tooltip().historyBets;
        return Math.max(...historyBets);
    }

    /**
     * getter opening bet first
     * @returns {*}
     */
    get openingBet1() {
        return this.getOpeningBets(0)
    }

    /**
     * getter opening bet second
     * @returns {*}
     */
    get openingBet2() {
        return this.getOpeningBets(1);
    }

    /**
     * get opening odds for team
     * @param num
     * @returns {number}
     */
    getOpeningBets(num) {
        this.getBets().get(num).dispatchEvent(new Event('mouseover'));
        return new Tooltip().openingBets;
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