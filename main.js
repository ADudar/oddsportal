$(window).on('load', startScraping);

/**
 * run script
 */
function startScraping() {
    if (TodayEvents.isTodayEventsPage) {
        console.log('script started');
        clearLocalStorage();
        const todayEvents = new TodayEvents().todayEvents, i = 0;
        console.log('today events', todayEvents);
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
    if (++i < count) {
        const details = new EventDetails();
        todayEvents[i - 1].maxBet1 = details.maxBet1;
        todayEvents[i - 1].maxBet2 = details.maxBet2;
        todayEvents[i - 1].currentBet1 = details.currentBet1;
        todayEvents[i - 1].currentBet2 = details.currentBet2;
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
    alert('end');
    getDataFromStorage(['todayEvents'], (storage) => {
        const filtered = storage.todayEvents
            .filter(droppingBookiesGreaterEqual15Percents);
        console.log(filtered);
        clearLocalStorage();
    });
}

function onErrorEmptyStorage() {
    alert('empty storage exit');
}

function onErrorNoTodayEvents() {
    alert('no today events, exit');
}


// TODO: rerun script in every 30 min
// TODO: send notification to email
// TODO: parse different bookmakers ? refactor
// TODO: last event current bet's doesn't show
// TODO: why max bet opening odds ignored ?