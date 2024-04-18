const flattenMongooseDocument = (document) => {
  return !document
    ? document
    : document.toObject
    ? document.toObject({ virtuals: true })
    : document;
};

module.exports = flattenMongooseDocument;
