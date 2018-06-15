function startScraping() {

    onDetailsCollected(onDetailsCollectedHandler);

    if (TodayEvents.isTodayEventsPage()) {
        const todayEvents = new TodayEvents().todayEvents;
        // window.open(todayEvents[0].link, '_blank');
        window.location.href = todayEvents[0].link;
    } else { //event details
        const details = new EventDetails();
        alert('cur bet 1: ' + details.currentBet1);
        alert('max bet 1: ' + details.maxBet1);
        // window.close();
    }
}

function onDetailsCollected(callback) {
    chrome.storage.onChanged.addListener(callback);
}

function onDetailsCollectedHandler(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
}

$(window).on('load', startScraping);
