'use strict';

module.exports = url => {
  const index = url.indexOf('@');
  if (index === -1) return url;
  const startIndex = url.lastIndexOf(':', index);
  return url.substring(0, startIndex + 1) + '******' + url.substring(index);
};
