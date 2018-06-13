$(window).on('load', startScraping);

function startScraping() {
    if (TodayEvents.isTodayEventsPage()) {
        const todayEvents = new TodayEvents().todayEvents;
        window.open(todayEvents[0].link, '_blank');
    } else { //event details
        const details = new EventDetails();
        // alert('cur bet 1: ' + details.currentBet1);
        // alert('max bet 1: ' + details.maxBet1);
        window.close()
    }
}

class Tooltip {
    constructor() {
        this._selector = '#tooltiptext strong:not(:last-of-type)';
    }

    get coeffs() {
        return $(this._selector).map((i, v) => +v.innerText).toArray();
    }
}

// for first bk
class EventDetails {

    constructor() {
        this.betsSelector = '.table-container:first-child tr .odds [onmouseover]';
    }

    get bets() {
        return this._bets ? this._bets : this._bets = $(this.betsSelector);
    }

    getmaxBet(num) {
        this.bets.get(num).dispatchEvent(new Event('mouseover'));
        const coeffs = new Tooltip().coeffs;
        return Math.max(...coeffs);
    }

    get currentBet1() {
        return this.getCurrentBet(0);
    }

    get currentBet2() {
        return this.getCurrentBet(1);
    }

    getCurrentBet(num) {
        return this.bets.eq(num).text();
    }

    get maxBet1() {
        return this.getmaxBet(0);

    }

    get maxBet2() {
        return this.getmaxBet(1);
    }
}

class TodayEvents {

    static isTodayEventsPage() {
        const todayTitleSelector = '#col-content h1';
        const includesText = 'Today';
        return $(todayTitleSelector).first().text().includes(includesText);
    }

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

// chrome.runtime.getBackgroundPage(function() {
//     console.log('should be bg page', this);
// });
// chrome.storage.local.set({variable: 'variableInformation'});
// chrome.storage.local.get(['variable'], function (result) {
//     console.log('bar', result.variable);
// });