class FilterFactory {
  constructor() {
    this.selectedFilter = []
    this.recipes = []
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
      const filteredRecipes = JSON.parse(sessionStorage.getItem('matchedRecipes'))
      this.recipes = await recipeService.findRecipesByFilters(
        this.selectedFilter,
        filteredRecipes
      )
    }
  }

  async renderSelectedFilters() {
    let filters = [...this.selectedFilter]
    const selectedFilterSection = document.querySelector('#selectedFilters')
    const selectedFilterWrapper = document.querySelector(
      '.selectedFiltersWrapper'
    )
    const filter = document.querySelectorAll('.filterElement')

    filter.forEach((element) => {
      const selectFilter = () => {
        const selectedElement = element.textContent.trim()

        if (!filters.includes(selectedElement)) {
          filters = [...filters, selectedElement]

          element.classList.add('selectedFilter')
          const closeIconElementWrapper = document.createElement('figure')
          const closeIconElement = document.createElement('img')
          closeIconElement.src = './public/assets/icons/listCross.svg'
          closeIconElement.alt = 'close icon'
          closeIconElement.className = 'selectedFiltersWrapper__list__closeIcn'
          closeIconElementWrapper.appendChild(closeIconElement)
          element.appendChild(closeIconElementWrapper)

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
        }

        this.selectedFilter = [...filters]
        this.displayRecipesByFilter()
        this.removeSelectedFilter(filters)
      }

      element.addEventListener('click', selectFilter)
    })
  }

  async removeSelectedFilter(filters) {
    const filterRemoveButtons = document.querySelectorAll(
      '.selectedFiltersWrapper__list__closeIcn'
    )

    filterRemoveButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        console.log('clicked')
        event.stopPropagation()
        // const filterListItem = button.closest('.selectedFiltersWrapper__list');

        const filterList = document.querySelectorAll(
          '.selectedFiltersWrapper__list'
        )
        filterList.forEach((filterListItem) => {
          if (
            filterListItem.textContent ===
            button.parentNode.parentNode.textContent
          ) {
            const filterText = filterListItem
              .querySelector('.selectedFiltersWrapper__list__text')
              .textContent.trim()

            filterListItem.remove()

            const index = filters.findIndex(
              (filter) =>
                filter.toLowerCase().trim() === filterText.toLowerCase().trim()
            )

            if (index !== -1) {
              filters.splice(index, 1)
            }

            const selectedElement = document.querySelector('.selectedFilter')
            if (selectedElement) {
              selectedElement.classList.remove('selectedFilter')
              const closeIconElement = selectedElement.querySelector(
                '.selectedFiltersWrapper__list__closeIcn'
              )
              if (closeIconElement) {
                closeIconElement.remove()
              }
            }

            this.selectedFilter = filters
            this.displayRecipesByFilter()
          }
        })
      })
    })
  }
}
