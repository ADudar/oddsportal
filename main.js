const LOG_ENABLED = true;
const ALERT_ENABLED = false;

$(window).on('load', startScraping);

/**
 * run script
 */
function startScraping() {
    if (TodayEvents.isTodayEventsPage) {
        log('script started');
        clearLocalStorage();
        const todayEvents = new TodayEvents().todayEvents, i = 0;
        log('today events', todayEvents);
        if (!todayEvents.length) {
            return onErrorNoTodayEvents();
        }
        setDataToStorage({i, count: todayEvents.length, todayEvents});
        navigateEventDetailsPage(todayEvents, i);
    } else { //event details
        getDataFromStorage(['count', 'i', 'todayEvents'], HandlerEventsDetails)
    }
}

/**
 * event details handler
 * @param storage
 * @constructor
 */
function HandlerEventsDetails(storage) {
    let {count, i, todayEvents} = storage;
    if (!todayEvents) return onErrorEmptyStorage();
    if (i < count && i<5) {
        log('i', i);
        const details = new EventDetails();
        todayEvents[i].maxBet1 = details.maxHistoryBet1;
        todayEvents[i].maxBet2 = details.maxHistoryBet2;
        todayEvents[i].currentBet1 = details.currentBet1;
        todayEvents[i].currentBet2 = details.currentBet2;
        todayEvents[i].openingBet1 = details.openingBet1;
        todayEvents[i].openingBet2 = details.openingBet2;
        i++;
        setDataToStorage({i, todayEvents});
        navigateEventDetailsPage(todayEvents, i);
    } else {
        onEnd();
    }
}

/**
 * navigate to nextIndex events details page
 * @param todayEvents
 * @param nextIndex
 */
function navigateEventDetailsPage(todayEvents, nextIndex) {
    window.location.href = todayEvents[nextIndex].link;
}

/**
 * save data to storage
 * @param dataObj
 */
function setDataToStorage(dataObj) {
    chrome.storage.local.set(dataObj);
}

/**
 * get data from storage
 * @param dataArr properties name array
 * @param callback function on get
 */
function getDataFromStorage(dataArr, callback) {
    chrome.storage.local.get(dataArr, callback);
}

/**
 * clear chrome local storage
 */
function clearLocalStorage() {
    chrome.storage.local.clear();
}

/**
 * on end handler
 */
function onEnd() {
    getDataFromStorage(['todayEvents'], (storage) => {
        log('end', storage.todayEvents);
        const filtered = storage.todayEvents
            .filter(droppingBookiesGreaterEqual15Percents);
        log('result', filtered);
        clearLocalStorage();
    });
}

/**
 * error handler empty storage
 */
function onErrorEmptyStorage() {
    log('empty storage exit');
}

/**
 * error handler no today events
 */
function onErrorNoTodayEvents() {
    log('no today events, exit');
}

/**
 * log function alert and console
 * @param message
 * @param data
 */
function log(message, data) {
    if (LOG_ENABLED) {
        console.log(message, data);
    }
    if (ALERT_ENABLED) {
        alert(message);
    }
}


// TODO: rerun script in every 30 min
// TODO: send notification to email
// TODO: parse different bookmakers ? refactor
// TODO: last event current bet's doesn't show
// TODO: why max bet opening odds ignored ?