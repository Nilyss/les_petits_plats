class FilterFactory {
  constructor() {
    this.selectedFilter = []
  }

  async renderFilters(items, wrapperClass) {
    if (items) {
      const wrapperElement = document.querySelector(`.${wrapperClass}`)
      wrapperElement.innerHTML = ''
      items.forEach((item) => {
        item = item.charAt(0).toUpperCase() + item.slice(1)
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

  async displayRecipesByFilter() {
    const recipeService = new RecipeService()

    if (this.selectedFilter.length >= 2) {
      return await recipeService.findRecipesByFilters(
        this.selectedFilter,
        this.recipes
      )
    } else {
      this.recipes = await recipeService.findRecipesByFilters(
        this.selectedFilter
      )
    }
  }

  async renderSelectedFilters() {
    const selectedFilterSection = document.querySelector('#selectedFilters')
    const filter = document.querySelectorAll('.filterElement')
    filter.forEach((element) => {
      const selectFilter = (element) => {
        const selectedElement = element.target.textContent

        if (!this.selectedFilter.includes(selectedElement)) {
          // Add the filter to the list
          this.selectedFilter.push(selectedElement)

          // change the style of the filter in select list and add a close btn
          element.target.classList.add('selectedFilter')
          const closeIconElementWrapper = document.createElement('figure')
          const closeIconElement = document.createElement('img')
          closeIconElement.src = './public/assets/icons/listCross.svg'
          closeIconElement.alt = 'close icon'
          closeIconElement.className = 'selectedFiltersWrapper__list__closeIcn'
          closeIconElementWrapper.appendChild(closeIconElement)
          element.target.appendChild(closeIconElementWrapper)

          // create the new filter button then display it in dom
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

          selectedFilterWrapper.appendChild(filterButton)
          selectedFilterSection.appendChild(selectedFilterWrapper)

          //  Remove the filter from the DOM then remove it from the list of selected filters, and remove the style in the select list
          const removeElement = (event) => {
            event.stopPropagation()
            filterButton.remove()
            this.selectedFilter.splice(
              this.selectedFilter.indexOf(selectedElement),
              1
            )
            element.target.classList.remove('selectedFilter')
            closeIconElementWrapper.remove()
            this.displayRecipesByFilter()
          }

          closeIcon.addEventListener('click', removeElement)
          closeIconElementWrapper.addEventListener('click', removeElement)
        }
        this.displayRecipesByFilter()
      }

      element.addEventListener('click', selectFilter)
    })
  }
}
