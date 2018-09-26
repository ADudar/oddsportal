/**
 * filter dropped events by min and max value coefficients
 * @param event
 * @returns {boolean}
 */
function minMaxValueCoefficients(event) {
    const currentBet = event.isDroppingFirst ? event.currentBet1 : event.currentBet2;
    return currentBet >= MinMaxBetsConfig.minCoefficient && currentBet <= MinMaxBetsConfig.maxCoefficient;
}
