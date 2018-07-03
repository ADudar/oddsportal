/**
 * filter drop >= percent
 * @param e event
 * @param droppingPercent percent value
 * @returns {boolean}
 */
function droppingBookiesGreaterInPercents(e, droppingPercent) {
    const dropping1 = droppingOdds(e.openingBet1, e.currentBet1);
    const dropping2 = droppingOdds(e.openingBet2, e.currentBet2);
    const isDropping1 = isDroppingOdds(e.openingBet1, e.currentBet1, droppingPercent);
    const isDropping2 = isDroppingOdds(e.openingBet2, e.currentBet2, droppingPercent);
    return isDropping1 ? Boolean(e.droppingBookies = dropping1) : isDropping2 ? Boolean(e.droppingBookies = dropping2) : false;
}

/**
 * dropping formula
 * @param openingBet
 * @param currentBet
 * @param droppingPercent
 * @returns {boolean}
 */
function isDroppingOdds(openingBet, currentBet, droppingPercent) {
    return droppingOdds(openingBet, currentBet) >= droppingPercent / 100;
}

/**
 * calculate dropping
 * @param openingBet
 * @param currentBet
 * @returns {number}
 */
function droppingOdds(openingBet, currentBet) {
    return (openingBet - currentBet) / (openingBet - 1);
}
