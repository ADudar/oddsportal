/*
filter dropped events by min and max value coefficients
 */
function minMaxValueCoefficients(currentBet, minCoefficient = 1.45, maxCoefficient = 2.1) {
    return currentBet >= minCoefficient && currentBet <= maxCoefficient;
}
