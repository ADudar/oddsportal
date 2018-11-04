class TimezoneManager {
    static setGMT3TimeZoneUrl() {
        window.location.href = `https://www.oddsportal.com/set-timezone/50`;
    }

    static get GMT3TimeZone() {
        return 'GMT +3';
    }

    static getCurrentTimeZone() {
        const timezoneText = $('#user-header-timezone-expander').text();
        return timezoneText.substring(timezoneText.indexOf('GMT'));
    }
}