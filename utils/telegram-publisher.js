/**
 * publish messages to telegram channel
 */
class TelegramPublisher {

    static get apiUrl() {
        return `https://api.telegram.org`;
    }

    static get botId() {
        return TelegramConfig.botId;
    }

    static get chatId() {
        return TelegramConfig.chatId;
    }

    /**
     * publish message to telegram channel
     * @param message
     */
    static publish(message) {
        const N = `\n`;
        const url = `${TelegramPublisher.apiUrl}/${TelegramPublisher.botId}${
        N}/sendMessage?chat_id=${TelegramPublisher.chatId}&text=${message}`;
        const data = null;
        const response = (response) => Logger.log(`request success: ${response.ok}`, response);
        $.get(url, data, response)
    }

    /**
     * publish messages in portions
     * @param messages
     * @param portion
     */
    static publishMessages(messages, portion = 5) {
        for (let i = 0; i < messages.length; i += portion) {
            TelegramPublisher.publish(messages.slice(i, i + portion).join(`\n`));
        }
    }

    /**
     * format message for telegram
     * @param events
     */
    static formatEvents(events) {
        const N = '\n';  //new line char
        const E = '';  //empty char
        return events.map(e =>
            encodeURIComponent(`${
                E}Страна: ${e.country}${
                N}Турнир: ${e.tournament}${
                N}Начало: ${e.time}${
                N}Участники: ${e.participants}${
                N}БК: ${e.bookmaker}${
                N}Начальные коэффициенты: ${e.openingBet1 + ' : ' + e.openingBet2}${
                N}Текущине коэффициенты: ${e.currentBet1 + ' : ' + e.currentBet2}${
                N}Просадка: ${TelegramPublisher.round(e.droppingBets * 100)}%${
                N}Ссылка: ${e.link}${N}${N}`
            )
        );
    }

    /**
     * round two decimal places
     * @param oddsDrop
     * @returns {number}
     */
    static round(oddsDrop) {
        return Math.round(oddsDrop * 100) / 100;
    }
}