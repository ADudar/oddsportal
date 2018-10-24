/**
 * control params for mode
 */
class ModeManager {
    /**
     * determination women mode
     * if url contains word 'Women'
     * else mode for 'Mens'
     * @returns {boolean}
     */
    static isWomen() {
        return window.location.href.toLowerCase().includes(ModeManager.womenMode);
    }

    static get modeByUrl() {
        return ModeManager.isWomen() ? ModeManager.womenMode : ModeManager.menMode;
    }

    /**
     * determination women mode
     * @returns {string}
     */
    static get womenMode() {
        return 'women';
    }

    /**
     * determination men mode
     * @returns {string}
     */
    static get menMode() {
        return 'men';
    }


    /**
     * set correct chat
     */
    static setEventsForMode() {
        EventsConfig.skipITFEvents = !ModeManager.isWomen();
        EventsConfig.skipWTAEvents = !ModeManager.isWomen();
        EventsConfig.skipMenEvents = ModeManager.isWomen();
    }

    /**
     * set chat id for mode
     */
    static setChatIdForMode(mode) {
        TelegramPublisher.chatId = ModeManager.womenMode === mode.toLowerCase() ? TelegramConfig.womanChatId : TelegramConfig.menChatId;
    }
}