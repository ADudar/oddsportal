/**
 * filter drop >= percent
 * @param e event
 * @param droppingPercent percent value
 * @returns {boolean}
 */
function droppingBookiesGreaterInPercents(e, droppingPercent) {
    return (e.openingBet1 - e.currentBet1) / (e.openingBet1 - 1) >= droppingPercent / 100;
}
