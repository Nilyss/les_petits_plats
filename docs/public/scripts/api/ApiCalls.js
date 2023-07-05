class ApiCalls {
  constructor() {
    this.devMode = true;
    if(this.devMode) {
      this.apiURL = "https://nilyss.github.io/les_petits_plats_datas";
    }
    if(!this.devMode) {
      this.apiURL = "https://";
    }

    this.isValidStatus = [200, 201, 202, 203, 204, 205, 206];
    this.errorMessage =
      "Une erreur est survenue lors de la récupération des données.";
  }

  // ********** GET REQUEST **********
  async fetch(val) {
    return fetch(this.apiURL + val)
      .then((response) => {
        if (response.status === this.isValidStatus[0]) {
          return response.json();
        } else {
          throw new Error(this.errorMessage);
        }
      })
      .then((data) => data)
      .catch((error) => console.error(error));
  }
}