/**
 * script reload class
 */
class ScriptReloader {
    /**
     * reload script interval in  minutes
     * @param timeoutInMin timeout in minutes
     */
    static reloadScriptIntervalInMinutes(timeoutInMin = 30) {
        setInterval(() => window.location.href = Events.todayTennisEventsUrl, timeoutInMin * 60 * 1000);
    }
}