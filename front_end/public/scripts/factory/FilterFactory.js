class FilterFactory {
  constructor() {}

  async renderFilters(items, wrapperClass) {
    if (items) {
      const wrapperElement = document.querySelector(`.${wrapperClass}`)
      items.forEach((item) => {
        const listItem = document.createElement('li')
        const paragraph = document.createElement('p')
        paragraph.className = 'filterElement'
        const itemText = document.createTextNode(item)
        paragraph.appendChild(itemText)
        listItem.appendChild(paragraph)
        wrapperElement.appendChild(listItem)
      })
    }
  }

  async renderSelectedFilters() {
    let selectedFilter = []

    const selectedFilterSection = document.querySelector('#selectedFilters')
    const filter = document.querySelectorAll('.filterElement')
    filter.forEach((element) => {
      const selectFilter = (element) => {
        const selectedElement = element.target.textContent
        if (!selectedFilter.includes(selectedElement)) {

          // Add the filter to the list, then display it
          selectedFilter.push(selectedElement)

          const selectedFilterWrapper = document.querySelector(
            '.selectedFiltersWrapper'
          )
          const filterButton = document.createElement('li')
          filterButton.className = 'selectedFiltersWrapper__list'

          const paragraph = document.createElement('p')
          paragraph.textContent = selectedElement
          paragraph.className = 'selectedFiltersWrapper__list__text'
          filterButton.appendChild(paragraph)

          const closeIconWrapper = document.createElement('figure')
          const closeIcon = document.createElement('img')
          closeIcon.src = './public/assets/icons/cross.svg'
          closeIcon.alt = 'close icon'
          closeIcon.className = 'selectedFiltersWrapper__list__closeIcn'
          closeIconWrapper.appendChild(closeIcon)
          filterButton.appendChild(closeIconWrapper)

          //  Remove the filter from the DOM then remove it from the list of selected filters
          closeIcon.addEventListener("click", () => {
            filterButton.remove();
            selectedFilter.splice(selectedFilter.indexOf(selectedElement), 1);
          });

          selectedFilterWrapper.appendChild(filterButton)
          selectedFilterSection.appendChild(selectedFilterWrapper)
        }
      }
      element.addEventListener('click', selectFilter)
    })
  }
}