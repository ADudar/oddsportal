/**
 * script reload class
 */
class ScriptReloader {
    /**
     * reload script interval in  minutes
     * @param timeoutInMin timeout in minutes
     */
    static reloadScriptInterval(timeoutInMin = 30) {
        const intId = setInterval(() => {
            clearInterval(intId);
            window.location.href = TodayEvents.todayTennisEventsUrl;
        }, timeoutInMin * 60 * 1000);
    }
}