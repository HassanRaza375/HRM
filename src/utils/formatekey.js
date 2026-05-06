const formatKey = (key) => {
  return key
    .trim() // remove spaces before/after
    .toLowerCase() // lowercase
    .replace(/\s+/g, "") // remove all spaces
    .replace(/[^a-z0-9]/g, ""); // remove special chars (like brackets)
};

export default formatKey;
