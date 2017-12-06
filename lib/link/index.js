const addAttrs = require('../utils/attrs');

module.exports = function addStyleUrl (url, options) {
  if (typeof DEBUG !== "undefined" && DEBUG) {
    if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
  }

  options = options || {};

  options.hmr = typeof options.hmr === 'undefined' ? true : options.hmr;
  options.attrs = typeof options.attrs === "object" ? options.attrs : {};

  var link = document.createElement("link");

  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;

  addAttrs(link, options.attrs);

  var head = document.getElementsByTagName("head")[0];

  head.appendChild(link);

  if (options.hmr && module.hot) {
    return function(url) {
      if(typeof url === "string") {
        link.href = url;
      } else {
        head.removeChild(link);
      }
    };
  }
}