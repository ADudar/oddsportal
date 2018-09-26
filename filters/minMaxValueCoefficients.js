/**
 * filter dropped events by min and max value coefficients
 * @param currentBet
 * @returns {boolean}
 */
function minMaxValueCoefficients(currentBet) {
    return currentBet >= MinMaxBetsConfig.minCoefficient && currentBet <= MinMaxBetsConfig.maxCoefficient;
}
