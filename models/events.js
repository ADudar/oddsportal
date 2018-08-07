/**
 * Events object
 */
class Events {

    /**
     * today date
     * @returns {Date}
     * @constructor
     */
    static get TodayDate() {
        return new Date();
    }

    /**
     * tomorrow date
     * @constructor
     */
    static get TomorrowDate() {
        return new Date(Events.TodayDate.getTime() + (24 * 60 * 60 * 1000));
    }

    static get TennisBaseUrl() {
        return `http://www.oddsportal.com/matches/tennis/`;
    }

    /**
     * get today date in format yyyymmdd
     * @returns {string}
     */
    static get todayFullDate() {
        const dd = Events.TodayDate.getDate();
        const mm = Events.TodayDate.getMonth() + 1; //January is 0!
        const yyyy = Events.TodayDate.getFullYear();
        return `${yyyy}${mm < 10 ? '0' + mm : mm}${dd < 10 ? '0' + dd : dd}`;
    }

    /**
     * get tomorrow date in format yyyymmdd
     */
    static get tomorrowFullDate() {
        const dd = Events.TomorrowDate.getDate();
        const mm = Events.TomorrowDate.getMonth() + 1; //January is 0!
        const yyyy = Events.TomorrowDate.getFullYear();
        return `${yyyy}${mm < 10 ? '0' + mm : mm}${dd < 10 ? '0' + dd : dd}`;
    }

    /**
     * getter today date tennis events url
     * @returns {string}
     */
    static get todayTennisEventsUrl() {
        return `${Events.TennisBaseUrl}${Events.todayFullDate}/`
    }

    /**
     * getter tomorrow date tennis events url
     * @returns {string}
     */
    static get tomorrowTennisEventsUrl() {
        return `${Events.TennisBaseUrl}${Events.tomorrowFullDate}/`
    }

    /**
     * check if today events page opened
     * @returns {boolean | jQuery}
     */
    static get isTodayTennisEventsPage() {
        const todayUrl = Events.todayTennisEventsUrl;
        const curUrl = window.location.href;
        return todayUrl === curUrl;
    }

    /**
     * check if tomorrow events page opened
     * @returns {boolean}
     */
    static get isTomorrowTennisEventsPage() {
        const tomorrowUrl = Events.tomorrowTennisEventsUrl;
        const curUrl = window.location.href;
        return tomorrowUrl === curUrl;
    }

    /**
     * constructor
     * @param skipNoBetsEvents
     * @param skipResultsWithScores
     * @param skipLiveEvents
     * @param skipITF
     * @param skipWTA
     * @param skipDoubles
     */
    constructor(skipNoBetsEvents = true,
                skipResultsWithScores = true,
                skipLiveEvents = true,
                skipITF = true,
                skipWTA = true,
                skipDoubles = true) {
        this.skipNoBetsEvents = skipNoBetsEvents;
        this.skipResultsWithScores = skipResultsWithScores;
        this.skipLiveEvents = skipLiveEvents;
        this.skipITF = skipITF;
        this.skipWTA = skipWTA;
        this.skipDoubles = skipDoubles;
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
    get participants() {
        return this.events.map((i, el) => el.innerText);
    }

    /**
     * getter event details link
     * @returns {*|{}|Uint8Array|any[]|Int32Array|Uint16Array}
     */
    get links() {
        return this.events.map((i, el) => {
            const a = $(el).find('a:last-child');
            return a.length ? a[0].href : ''
        })
    }

    /**
     * getter event time
     * @returns {*|{}|Uint8Array|string[]|Int32Array|Uint16Array}
     */
    get times() {
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
     * getter events full object
     * @returns {Array}
     */
    get Events() {
        const links = this.links.toArray();
        const times = this.times.toArray();
        const avCoeffs1 = this.averageCoefParticipant1.toArray();
        const avCoeffs2 = this.averageCoefParticipant2.toArray();
        const tournaments = this.tournaments;
        const countries = this.countries;
        const resultsScores = this.resultsScores;
        const isLive = this.isLive;
        return this.participants.toArray().reduce((prev, cur, index) => {
            if (this.skipAndNoBets(avCoeffs1, index) ||
                this.skipAndResultsWithScores(resultsScores, index) ||
                this.skipAndLive(isLive, index) ||
                this.skipAndITF(tournaments, index) ||
                this.skipAndWTA(tournaments, index) ||
                this.skipAndDoubles(tournaments, index)) {
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
                resultScore: resultsScores[index],
                isLive: isLive[index]
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

    /**
     * skip event if skip flag
     * and is ITF
     * @param tournaments
     * @param index
     * @returns {boolean}
     */
    skipAndITF(tournaments, index) {
        return this.skipITF && tournaments[index].includes('ITF');

    }

    /**
     * skip event if skip flag
     * and is WTA
     * @param tournaments
     * @param index
     * @returns {boolean}
     */
    skipAndWTA(tournaments, index) {
        return this.skipWTA && tournaments[index].includes('WTA');
    }

    /**
     * skip event if skip flag
     * and is Doubles
     * @param tournaments
     * @param index
     * @returns {boolean}
     */
    skipAndDoubles(tournaments, index) {
        return this.skipDoubles && tournaments[index].includes('Doubles');
    }
}