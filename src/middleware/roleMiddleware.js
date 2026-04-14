const authorizeRole = (...listRoleAccept) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'gagal',
        message: 'akses ditolak, anda harus login terlebih dahulu'
      });
    }

    const roleUser = req.user.role;
    console.log(req.user);

    const isAccept = listRoleAccept.includes(roleUser);

    if (isAccept === false) {
      return res.status(403).json({
        status: 'gagal',
        message: `Akses ditolak, anda tidak punya izin ke sini`
      });
    }

    next();
  }
}

module.exports = {
  authorizeRole
};