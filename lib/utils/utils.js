const dateUtils = require('./date.js');

/**
 * Returns true if help should be printed
 * @param options
 * @returns {*|boolean}
 */
function showHelp(options) {
  return options.help || !paramsAreOk(options);
}

/**
 * Chech if params are ok
 * @param options
 * @returns {boolean|boolean|*}
 */
function paramsAreOk(options) {
  return !!options.apiKey
    && !!options.apiSecret
    && dateUtils.isValidDate(options.dateFrom) || options.dateFrom === '0' || typeof options.dateFrom === 'undefined'
    && (dateUtils.isValidDate(options.dateTo) || options.dateTo === '-1' || options.dateTo === '0' || typeof options.dateFrom === 'undefined')
    && !!options.query;
}

module.exports = {
  showHelp
};
