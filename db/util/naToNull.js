function naToNull(objectToSave) {
  if (typeof objectToSave !== "object" || objectToSave instanceof Array) {
    return objectToSave;
  }

  const formattedObject = { ...objectToSave };
  Object.entries(objectToSave).map(([key, value]) => {
    if (typeof value !== "string" && value === "n/a") {
      formattedObject[key] = null;
    }
  });
  return formattedObject;
}

module.exports = naToNull;
