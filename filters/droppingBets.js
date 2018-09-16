/**
 * filter drop >= percent
 * @param event
 * @param droppingPercent percent value
 * @returns {boolean}
 */
function droppingBetsGreaterInPercents(event, droppingPercent) {
    const droppingFirst = droppingOdds(event.openingBet1, event.currentBet1);
    const droppingSecond = droppingOdds(event.openingBet2, event.currentBet2);
    const isDroppingFirst = isDroppingOdds(event.openingBet1, event.currentBet1, droppingPercent);
    const isDroppingSecond = isDroppingOdds(event.openingBet2, event.currentBet2, droppingPercent);
    event.isDroppingFirst = isDroppingFirst; //TODO: assign properties in parseEventsDetails fn
    event.isDroppingSecond = isDroppingSecond;
    return isDroppingFirst ? Boolean(event.droppingBets = droppingFirst) : isDroppingSecond ? Boolean(event.droppingBets = droppingSecond) : false;
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
