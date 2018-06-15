$(window).on('load', startScraping);

function startScraping() {
    if (TodayEvents.isTodayEventsPage()) {
        const todayEvents = new TodayEvents().todayEvents;
        window.open(todayEvents[0].link, '_blank');
    } else { //event details
        const details = new EventDetails();
        alert('cur bet 1: ' + details.currentBet1);
        alert('max bet 1: ' + details.maxBet1);
        // window.close();
    }
}

// chrome.runtime.getBackgroundPage(function() {
//     console.log('should be bg page', this);
// });
// chrome.storage.local.set({variable: 'variableInformation'});
// chrome.storage.local.get(['variable'], function (result) {
//     console.log('bar', result.variable);
// });