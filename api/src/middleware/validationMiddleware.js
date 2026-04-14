function validateBody(schema) {
  return function (req, res, next) {
    const checkResult = schema.validate(req.body);

    if (checkResult.error) {
      return res.status(400).json({
        status: 'gagal',
        message: checkResult.error.details[0].message,
      });
    }

    req.body = checkResult.value;

    next();
  }
}

module.exports = { validateBody };