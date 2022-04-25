const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.status) {
    if (err.status === 400) {
      return res.status(400).send({ message: err.message, errors: err.errors });
    }

    return res.status(err.status).send({ message: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(400).send();
  }

  if (err.name === "MongoServerError") {
    switch (err.code) {
      case 11000:
        return res.status(409).send();
    }
  }

  return res.status(500).send();
};

module.exports = errorHandler;
