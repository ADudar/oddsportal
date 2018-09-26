/**
 * Dropping bets helper
 */
class DroppingBetsHelper {

    /**
     * constructor
     * @param event
     */
    constructor(event) {
        this.droppingFirst = DroppingBetsHelper.droppingOdds(event.openingBet1, event.currentBet1);
        this.droppingSecond = DroppingBetsHelper.droppingOdds(event.openingBet2, event.currentBet2);
        this.isDroppingFirst = DroppingBetsHelper.isDroppingOdds(event.openingBet1, event.currentBet1);
        this.isDroppingSecond = DroppingBetsHelper.isDroppingOdds(event.openingBet2, event.currentBet2);
        this.droppingBets = this.isDroppingFirst ? this.droppingFirst : this.isDroppingSecond ? this.droppingSecond : false;
    }

    /**
     * dropping determination, depending on percents %
     * @param openingBet
     * @param currentBet
     * @param droppingPercent
     * @returns {boolean}
     */
    static isDroppingOdds(openingBet, currentBet) {
        return DroppingBetsHelper.droppingOdds(openingBet, currentBet) >= DroppingPercentConfig.droppingPercent / 100;
    }

    /**
     * calculate dropping value
     * @param openingBet
     * @param currentBet
     * @returns {number}
     */
    static droppingOdds(openingBet, currentBet) {
        return (openingBet - currentBet) / (openingBet - 1);
    }

    /**
     * filter by dropping bets
     * @param event
     * @returns {*}
     */
    static isDroppingBets(event) {
        return event.droppingBets;
    }
}