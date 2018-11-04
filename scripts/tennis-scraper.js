/**
 * tennis scraper
 */
class TennisScraper {
    /**
     * start script
     */
    static startScraping() {
        if (Events.isTodayTennisEventsPage || Events.isTomorrowTennisEventsPage
            || // redirect to saved url after setup timezone
            StorageHelper.getDataFromStorage(['fromSetupTimeZone', 'savedUrl'], ({fromSetupTimeZone, savedUrl}) => {
                if (fromSetupTimeZone) {
                    StorageHelper.clearLocalStorage();
                    return window.location.href = savedUrl;
                }
            })
        ) {
            if (TimezoneManager.GMT3TimeZone !== TimezoneManager.getCurrentTimeZone()) { // set url with cur timezone
                Logger.log('setup GMT3 timezone');
                StorageHelper.setDataToStorage({fromSetupTimeZone: true, savedUrl: window.location.href});
                return TimezoneManager.setGMT3TimeZoneUrl();
            }
            Logger.log('script started');
            ModeManager.setEventsForMode();
            StorageHelper.clearLocalStorage();
            const events = new Events().Events, i = 0;
            Logger.log('events', events);
            if (!events.length) {
                return ErrorHandler.onErrorNoEvents();
            }
            StorageHelper.setDataToStorage({i, count: events.length, events, mode: ModeManager.modeByUrl});
            EventDetails.navigateEventDetailsPage(events, i);
        } else { //event details
            StorageHelper.getDataFromStorage(['count', 'i', 'events'], TennisScraper.ParseEventsDetailsPage)
        }
    }

    /**
     * event details handler
     * @param storage
     * @constructor
     */
    static ParseEventsDetailsPage(storage) {
        let {count, i, events} = storage;
        if (!events) return ErrorHandler.onErrorEmptyStorage();
        Logger.log(`i: ${i}, count: ${count}`, {i, count});
        const details = new EventDetails(BOOKMAKERS.Pinnacle);
        if (details.getBets().length) {
            events[i].noBets = false;
            events[i].maxBet1 = details.maxHistoryBet1;
            events[i].maxBet2 = details.maxHistoryBet2;
            events[i].currentBet1 = details.currentBet1;
            events[i].currentBet2 = details.currentBet2;
            events[i].openingBet1 = details.openingBet1;
            events[i].openingBet2 = details.openingBet2;
            events[i].bookmaker = details.bookmaker;
            const droppingBetsHelper = new DroppingBetsHelper(events[i]);
            events[i].isDroppingFirst = droppingBetsHelper.isDroppingFirst;
            events[i].isDroppingSecond = droppingBetsHelper.isDroppingSecond;
            events[i].droppingFirst = droppingBetsHelper.droppingFirst;
            events[i].droppingSecond = droppingBetsHelper.droppingSecond;
            events[i].droppingBets = droppingBetsHelper.droppingBets;
        } else {
            events[i].noBets = true;
        }
        i++;
        StorageHelper.setDataToStorage({i, events});
        if (i < count) {
            EventDetails.navigateEventDetailsPage(events, i);
        } else {
            TennisScraper.onEnd();
        }
    }

    /**
     * on end handler
     */
    static onEnd() {
        StorageHelper.getDataFromStorage(['events', 'mode'], ({events, mode}) => {
            Logger.log('end', events);
            const filteredEvents = events
                .filter(event => DroppingBetsHelper.isDroppingBets(event))
                .filter(event => bookmakerName(event, BOOKMAKERS.Pinnacle))
                .filter(event => minMaxValueCoefficients(event));
            Logger.log('result', filteredEvents);
            ModeManager.setChatIdForMode(mode);
            TelegramPublisher.publishMessages(TelegramPublisher.formatEvents(filteredEvents));
            StorageHelper.clearLocalStorage();
            ScriptReloader.reloadScriptIntervalInMinutes(60 * 2);
        });
    }
}