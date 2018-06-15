/**
 * today events object
 */
class TodayEvents {

    /**
     * check if today events page opened
     * @returns {boolean | jQuery}
     */
    static isTodayEventsPage() {
        const todayTitleSelector = '#col-content h1';
        const includesText = 'Today';
        return $(todayTitleSelector).first().text().includes(includesText);
    }

    /**
     * constructor
     */
    constructor() {
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
        return this.events.map((i, el) => el.nextSibling.innerText.trim());
    }

    /**
     * getter average coef participant2
     * @returns {*|{}|Uint8Array|string[]|Int32Array|Uint16Array}
     */
    get averageCoefParticipant2() {
        return this.events.map((i, el) => el.nextSibling.nextSibling.innerText.trim());
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
        return this.todayParticipants.toArray().reduce((prev, cur, index) => {
            prev.push({
                participants: cur,
                link: links[index],
                time: times[index],
                average1: avCoeffs1[index],
                average2: avCoeffs2[index],
                country: '',
                tournament: ''
            });
            return prev;
        }, [])

    }
}