class Utils {
  constructor() {}

  // remove the escapement for avoiding the html injection
  /**
   * @param {string} unsafe
   * @param unsafe
   * @returns {Promise<string>} safe
   * @see Index.js#displayNumberOfRecipes
   */
  async safeText(unsafe) {
    const element = document.createElement('div');
    element.innerText = unsafe;
    return element.innerHTML;
  }
}