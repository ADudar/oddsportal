/**
 * filter drop >= 15%
 * @param e
 * @returns {boolean}
 */
function droppingBookiesGreaterEqual15Percents(e) {
    return (e.maxBet1 - e.currentBet1) / (e.maxBet1 - 1) >= 0.15;
}
