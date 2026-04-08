const tokenManager = require('../utils/tokenManager');

const authenticateUser = (req, res, next) => {
  const authorizationText = req.headers.authorization;

  if (authorizationText === undefined) {
    return res.status(401).json({
      status: 'gagal',
      message: 'Akses ditolak, butuh token'
    });
  }

  if (authorizationText.includes('Bearer') === false) {
    return res.status(401).json({
      status: 'gagal',
      message: 'Akses ditolak, format tokennya salah'
    });
  }

  const pureAccessToken = authorizationText.replace('Bearer ', '');
  try {
    const userInformation = tokenManager.verifyAccessToken(pureAccessToken);
    req.user = userInformation;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'gagal',
      message: 'Token invalid atau sudah kadaluarsa'
    });
  }
}

module.exports = {
  authenticateUser
};