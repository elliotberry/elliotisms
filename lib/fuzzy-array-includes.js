

Array.prototype.fuzzyIncludes = function (str) {
  str = str.toLowerCase();
  return this.reduce((acc, el) => acc || el.toLowerCase().indexOf(str) > -1 , false);
}
