/**
 * publish messages to telegram channel
 */
class TelegramPublisher {

    /**
     * api telegram url
     * @returns {string}
     */
    static get apiUrl() {
        return `https://api.telegram.org`;
    }

    /**
     * publish message to telegram channel
     * @param message
     */
    static publish(message) {
        const N = `\n`;
        const url = `${TelegramPublisher.apiUrl}/${TelegramConfig.botId}${
        N}/sendMessage?chat_id=${TelegramPublisher.chatId}&text=${message}&parse_mode=html`;
        const data = null;
        const response = (response) => Logger.log(`request success: ${response.ok}`, response);
        $.get(url, data, response)
    }

    /**
     * publish messages in portions
     * @param messages
     * @param portion
     */
    static publishMessages(messages, portion = 10) {
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
                E}Страна: ${TelegramPublisher.WrapToTag(e.country, 'b')}${
                N}Турнир: ${TelegramPublisher.WrapToTag(e.tournament, 'b')}${
                N}Начало: ${e.time}${
                N}Участники: ${TelegramPublisher.ToBoldDroppingBetsParticipant(e)}${
                N}БК: ${e.bookmaker}${
                N}Начальные коэффициенты: ${e.openingBet1 + ' : ' + e.openingBet2}${
                N}Текущине коэффициенты: ${e.currentBet1 + ' : ' + e.currentBet2}${
                N}Просадка: ${TelegramPublisher.round(e.droppingBets * 100)}%${
                N}Ссылка: ${e.link}${N}${N}`
            )
        );
    }

    /**
     * wrap text to tag
     * @param text
     * @param tag
     * @returns {string}
     * @constructor
     */
    static WrapToTag(text, tag) {
        return `<${tag}>${text}</${tag}>`;
    }

    /**
     * wrap to bold tag participant
     * @param event
     * @returns {string}
     * @constructor
     */
    static ToBoldDroppingBetsParticipant(event) {
        const boldTag = `b`;
        if (event.isDroppingFirst) {
            return `${TelegramPublisher.WrapToTag(event.participant1, boldTag)}-${event.participant2}`;
        }
        return `${event.participant1}-${TelegramPublisher.WrapToTag(event.participant2, boldTag)}`;
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