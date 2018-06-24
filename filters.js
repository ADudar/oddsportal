/**
 * filter drop >= 15%
 * @param e
 * @returns {boolean}
 */
function droppingBookiesGreaterEqual15Percents(e) {
    return (e.maxHistoryBet1 - e.currentBet1) / (e.maxHistoryBet1 - 1) >= 0.15;
}
