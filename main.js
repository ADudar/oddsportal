$(window).on('load', startScraping);

function startScraping() {
    const events = new Events();
    console.log('today events', events.todayEvents);
}

class Events {
    constructor() {
        this.eventsSelector = '.table-participant';
    }

    get events() {
        return this._events ? this._events : this._events = $(this.eventsSelector);
    }

    get todayParticipants() {
        return this.events.map((i, el) => el.innerText);
    }

    get todayLinks() {
        return this.events.find('a:last-child').map((i, el) => el.href);
    }

    get todayTimes() {
        return this.events.map((i, el) => el.previousSibling.innerText);
    }

    get averageCoefParticipant1() {
        return this.events.map((i, el) => el.nextSibling.innerText.trim());
    }

    get averageCoefParticipant2() {
        return this.events.map((i, el) => el.nextSibling.nextSibling.innerText.trim());
    }

    get todayEvents() {
        const links = this.todayLinks.toArray();
        const times = this.todayTimes.toArray();
        const avCoeffs1 = this.averageCoefParticipant1.toArray();
        const avCoeffs2 = this.averageCoefParticipant2.toArray();
        return {
            events: this.todayParticipants.toArray().reduce((prev, cur, index) => {
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
            }, []),
        }
    }
}

