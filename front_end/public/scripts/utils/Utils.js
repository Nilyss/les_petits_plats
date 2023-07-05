class Utils {
  constructor() {}

  // remove the escapement for avoiding the html injection
  /**
   * @param {string} unsafe
   * @param unsafe
   * @returns {Promise<string>}
   * @see Index.js#displayNumberOfRecipes
   */
  async safeText(unsafe) {
    const element = document.createElement('div');
    element.innerText = unsafe;
    return element.innerHTML;
  }

  // method for rendering filters elements
  /**
   * @param {Array} items (ingredients, appliances, ustensils)
   * @param  wrapperClass
   * @returns {Promise<void>}
   * @see Index.js#displayFilters
   */
  async displayFiltersItems(items, wrapperClass) {
    if (items) {
      const wrapperElement = document.querySelector(`.${wrapperClass}`)
      items.forEach((item) => {
        const listItem = document.createElement('li')
        const paragraph = document.createElement('p')
        const itemText = document.createTextNode(item)
        paragraph.appendChild(itemText)
        listItem.appendChild(paragraph)
        wrapperElement.appendChild(listItem)
      })
    }
  }
}
