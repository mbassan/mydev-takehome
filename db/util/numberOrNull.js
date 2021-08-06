function numberOrNull(value) {
  if (isNaN(value)) {
    return null;
  }
  return value;
}

module.exports = numberOrNull;
