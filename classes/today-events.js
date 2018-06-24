/**
 * today events object
 */
class TodayEvents {

    /**
     * check if today events page opened
     * @returns {boolean | jQuery}
     */
    static get isTodayEventsPage() {
        const todayTitleSelector = '#col-content h1';
        const includesText = 'Today';
        return $(todayTitleSelector).first().text().includes(includesText);
    }

    /**
     * constructor
     * @param skipNoBetsEvents
     * @param skipResultsWithScores
     * @param skipLiveEvents
     */
    constructor(skipNoBetsEvents = true, skipResultsWithScores = true, skipLiveEvents = true) {
        this.skipNoBetsEvents = skipNoBetsEvents;
        this.skipResultsWithScores = skipResultsWithScores;
        this.skipLiveEvents = skipLiveEvents;
        /**
         * events selector
         * @type {string}
         */
        this.eventsSelector = '.table-participant';
    }

    /**
     * getter events jquery array
     * @returns {*|jQuery|HTMLElement}
     */
    get events() {
        return this._events ? this._events : this._events = $(this.eventsSelector);
    }

    /**
     * getter event participants
     * @returns {*|{}|Uint8Array|string[]|Int32Array|Uint16Array}
     */
    get todayParticipants() {
        return this.events.map((i, el) => el.innerText);
    }

    /**
     * getter event details link
     * @returns {*|{}|Uint8Array|any[]|Int32Array|Uint16Array}
     */
    get todayLinks() {
        return this.events.find('a:last-child').map((i, el) => el.href);
    }

    /**
     * getter today event time
     * @returns {*|{}|Uint8Array|string[]|Int32Array|Uint16Array}
     */
    get todayTimes() {
        return this.events.map((i, el) => el.previousSibling.innerText);
    }

    /**
     * getter average coef participant1
     * @returns {*|{}|Uint8Array|string[]|Int32Array|Uint16Array}
     */
    get averageCoefParticipant1() {
        return this.events.map((i, el) => +$(el).nextAll('.odds-nowrp').first().text());
    }

    /**
     * getter average coef participant2
     * @returns {*|{}|Uint8Array|string[]|Int32Array|Uint16Array}
     */
    get averageCoefParticipant2() {
        return this.events.map((i, el) => +$(el).nextAll('.odds-nowrp').eq(1).text());
    }

    /**
     * getter courntries
     * @returns {*|{}|Uint8Array|(*|string|jQuery)[]|Int32Array|Uint16Array}
     */
    get countries() {
        return this.events.map((i, el) => $(el).parent().prevAll('.dark.center').first().find('a').first().text().trim())
    }

    /**
     * getter tournaments
     * @returns {*|{}|Uint8Array|(*|string|jQuery)[]|Int32Array|Uint16Array}
     */
    get tournaments() {
        return this.events.map((i, el) => $(el).parent().prevAll('.dark.center').first().find('a').eq(1).text().trim())
    }

    /**
     * getter result scores
     * @returns {*|{}|Uint8Array|jQuery[]|Int32Array|Uint16Array}
     */
    get resultsScores() {
        return this.events.map((i, el) => $(el).next('.table-score').text());
    }

    /**
     * getter is live
     * @returns {*|{}|Uint8Array|jQuery[]|Int32Array|Uint16Array}
     */
    get isLive() {
        return this.events.map((i, el) => !!$(el).find('.live-odds-ico-prev').length)
    }

    /**
     * getter today events full object
     * @returns {Array}
     */
    get todayEvents() {
        const links = this.todayLinks.toArray();
        const times = this.todayTimes.toArray();
        const avCoeffs1 = this.averageCoefParticipant1.toArray();
        const avCoeffs2 = this.averageCoefParticipant2.toArray();
        const tournaments = this.tournaments;
        const countries = this.countries;
        const resultsScores = this.resultsScores;
        const isLive = this.isLive;
        return this.todayParticipants.toArray().reduce((prev, cur, index) => {
            if (this.skipAndNoBets(avCoeffs1, index) || this.skipAndResultsWithScores(resultsScores, index) || this.skipAndLive(isLive, index)) {
                return prev;
            }
            prev.push({
                participants: cur,
                link: links[index],
                time: times[index],
                averageBet1: +avCoeffs1[index],
                averageBet2: +avCoeffs2[index],
                tournament: tournaments[index],
                country: countries[index],
                resultScore: resultsScores[index]
            });
            return prev;
        }, [])

    }

    /**
     * skip event if skip flag
     * and have result
     * @param resultsWithScores
     * @param index
     * @returns {boolean|*}
     */
    skipAndResultsWithScores(resultsWithScores, index) {
        return this.skipResultsWithScores && !!resultsWithScores[index];
    }

    /**
     * skip event if skip flag
     * and no bets
     * @param avCoeffs1
     * @param index
     * @returns {boolean|*}
     */
    skipAndNoBets(avCoeffs1, index) {
        return this.skipNoBetsEvents && isNaN(avCoeffs1[index]);
    }

    /**
     * skip event if skip flag
     * and isLive
     * @param isLive
     * @param index
     */
    skipAndLive(isLive, index) {
        return this.skipLiveEvents && isLive[index];
    }
}