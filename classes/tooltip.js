/**
 * tooltip object
 */
class Tooltip {
    constructor() {
        /**
         * selector tooltip coeffs for event
         * @type {string}
         * @private
         */
        this._selector = '#tooltiptext strong:not(:last-of-type)';
    }

    /**
     * getter coeffs array
     * @returns {*|T[]|jQuery}
     */
    get coeffs() {
        return $(this._selector).map((i, v) => +v.innerText).toArray();
    }
}