class FindFiltersService {
    constructor() {
        this.filterFactory = new FilterFactory()
        this.ingredients = null;
        this.appliances = null;
        this.ustensils = null;
        this.seachIngredientsInput = document.querySelector('#ingredients')
        this.searchAppliancesInput = document.querySelector('#appliances')
        this.searchUstensilsInput = document.querySelector('#ustensils')
    }

    async findIngredients() {
        const allIngredientsWrapper = document.querySelector('.ingredientsWrapper')
        const allIngredients = document.querySelectorAll('.toggle1 p')
        const ingredients = []
        allIngredients.forEach(ingredient => {
            ingredients.push(ingredient.textContent.toLowerCase())
        })

        this.seachIngredientsInput.addEventListener('input', (e) => {
            e.preventDefault()
            const searchInput = this.seachIngredientsInput.value.toLowerCase()
            const selectedIngredientsLowercase = []

            if(searchInput.length > 2) {
                ingredients.find((ingredient) => {
                    if(ingredient.includes(searchInput)) {
                        selectedIngredientsLowercase.push(ingredient)

                        const selectedIngredientsUpperCase = selectedIngredientsLowercase.map((item) => {
                            return item.charAt(0).toUpperCase() + item.slice(1)
                        })

                        allIngredientsWrapper.innerHTML = ''
                        this.filterFactory.renderFilters(selectedIngredientsUpperCase, 'ingredientsWrapper')
                        this.filterFactory.renderSelectedFilters()
                    }
                })
            } else {
                this.filterFactory.renderFilters(ingredients, 'ingredientsWrapper')
            }
        })
    }

    async findAppliances() {
        const allAppliancesWrapper = document.querySelector('.appliancesWrapper')
        const allAppliances = document.querySelectorAll('.toggle2 p')
        const appliances = []
        allAppliances.forEach(appliance => {
            appliances.push(appliance.textContent.toLowerCase())
        })

        this.searchAppliancesInput.addEventListener('input', (e) => {
            e.preventDefault()
            const searchInput = this.searchAppliancesInput.value.toLowerCase()
            const selectedAppliancesLowercase = []

            if(searchInput.length > 2) {
                appliances.find((appliance) => {
                    if(appliance.includes(searchInput)) {
                        selectedAppliancesLowercase.push(appliance)

                        const selectedAppliancesUpperCase = selectedAppliancesLowercase.map((item) => {
                            return item.charAt(0).toUpperCase() + item.slice(1)
                        })

                        allAppliancesWrapper.innerHTML = ''
                        this.filterFactory.renderFilters(selectedAppliancesUpperCase, 'appliancesWrapper')
                        this.filterFactory.renderSelectedFilters()
                    }
                })
            } else {
                this.filterFactory.renderFilters(appliances, 'appliancesWrapper')
            }
        })
    }

    async findUstensils() {
        const allUstensilsWrapper = document.querySelector('.ustensilsWrapper')
        const allUstensils = document.querySelectorAll('.toggle3 p')
        const ustensils = []
        allUstensils.forEach(ustensil => {
            ustensils.push(ustensil.textContent.toLowerCase())
        })

        this.searchUstensilsInput.addEventListener('input', (e) => {
            e.preventDefault()
            const searchInput = this.searchUstensilsInput.value.toLowerCase()
            const selectedUstensilsLowercase = []

            if(searchInput.length > 2) {
                ustensils.find((ustensil) => {
                    if(ustensil.includes(searchInput)) {
                        selectedUstensilsLowercase.push(ustensil)

                        const selectedUstensilsUpperCase = selectedUstensilsLowercase.map((item) => {
                            return item.charAt(0).toUpperCase() + item.slice(1)
                        })

                        allUstensilsWrapper.innerHTML = ''
                        this.filterFactory.renderFilters(selectedUstensilsUpperCase, 'ustensilsWrapper')
                        this.filterFactory.renderSelectedFilters()
                    }
                })
            } else {
                this.filterFactory.renderFilters(ustensils, 'ustensilsWrapper')
            }
        })
    }
}