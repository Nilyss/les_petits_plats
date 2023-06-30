class Utils {
  constructor() {}

  // remove the escapement for avoiding the html injection
  async safeText(unsafe) {
    const element = document.createElement('div');
    element.innerText = unsafe;
    return element.innerHTML;
  }
}
