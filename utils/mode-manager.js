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
        return window.location.href.includes('Women');
    }

    /**
     * set correct chat
     */
    static setModeByUrl() {
        TelegramPublisher.chatId = ModeManager.isWomen() ? TelegramConfig.womanChatId : TelegramConfig.menChatId;
        EventsConfig.skipITFEvents = !ModeManager.isWomen();
        EventsConfig.skipWTAEvents = !ModeManager.isWomen();
        EventsConfig.skipMenEvents = ModeManager.isWomen();
    }
}