/**
 * filter drop >= percent
 * @param e event
 * @param droppingPercent percent value
 * @returns {boolean}
 */
function droppingBookiesGreaterInPercents(e, droppingPercent) {
    return isDroppingOdds(e.openingBet1, e.currentBet1, droppingPercent) ||
        isDroppingOdds(e.openingBet2, e.currentBet2, droppingPercent)
}

/**
 * dropping formula
 * @param openingBet
 * @param currentBet
 * @param droppingPercent
 * @returns {boolean}
 */
function isDroppingOdds(openingBet, currentBet, droppingPercent) {
    return (openingBet - currentBet) / (openingBet - 1) >= droppingPercent / 100;
}
