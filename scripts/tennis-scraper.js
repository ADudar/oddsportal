/**
 * tennis scraper
 */
class TennisScraper {
    /**
     * start script
     */
    static startScraping() {
        if (TodayEvents.isTodayTennisEventsPage) {
            Logger.log('script started');
            StorageHelper.clearLocalStorage();
            const todayEvents = new TodayEvents().todayEvents, i = 0;
            Logger.log('today events', todayEvents);
            if (!todayEvents.length) {
                return ErrorHandler.onErrorNoTodayEvents();
            }
            StorageHelper.setDataToStorage({i, count: todayEvents.length, todayEvents});
            EventDetails.navigateEventDetailsPage(todayEvents, i);
        } else { //event details
            StorageHelper.getDataFromStorage(['count', 'i', 'todayEvents'], TennisScraper.ParseEventsDetailsPage)
        }
    }

    /**
     * event details handler
     * @param storage
     * @constructor
     */
    static ParseEventsDetailsPage(storage) {
        let {count, i, todayEvents} = storage;
        if (!todayEvents) return ErrorHandler.onErrorEmptyStorage();
        Logger.log(`i: ${i}, count: ${count}`, {i, count});
        const details = new EventDetails(BOOKMAKERS.Pinnacle);
        if (details.getBets().length) {
            todayEvents[i].noBets = false;
            todayEvents[i].maxBet1 = details.maxHistoryBet1;
            todayEvents[i].maxBet2 = details.maxHistoryBet2;
            todayEvents[i].currentBet1 = details.currentBet1;
            todayEvents[i].currentBet2 = details.currentBet2;
            todayEvents[i].openingBet1 = details.openingBet1;
            todayEvents[i].openingBet2 = details.openingBet2;
            todayEvents[i].bookmaker = details.bookmaker;
        } else {
            todayEvents[i].noBets = true;
        }
        i++;
        StorageHelper.setDataToStorage({i, todayEvents});
        if (i < count) {
            EventDetails.navigateEventDetailsPage(todayEvents, i);
        } else {
            TennisScraper.onEnd();
        }
    }

    /**
     * on end handler
     */
    static onEnd() {
        StorageHelper.getDataFromStorage(['todayEvents'], (storage) => {
            Logger.log('end', storage.todayEvents);
            const filteredEvents = storage.todayEvents
                .filter(e => droppingBetsGreaterInPercents(e, 15))
                .filter(e => bookmakerName(e, BOOKMAKERS.Pinnacle));
            Logger.log('result', filteredEvents);
            TelegramPublisher.publishMessages(TelegramPublisher.formatEvents(filteredEvents), 10);
            StorageHelper.clearLocalStorage();
            ScriptReloader.reloadScriptInterval(30);
        });
    }
}