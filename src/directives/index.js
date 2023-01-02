export const imagerror = {
  insert(dom, options) {
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
