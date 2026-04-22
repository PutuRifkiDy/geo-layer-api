const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const tokenManager = require('../utils/tokenManager');
const authModel = require('../models/authModel');

class UserController {
  async register(req, res) {

    try {
      const { username, email, password } = req.body;

      const isUsernameExist = await userModel.verifyUsernameExists(username);
      if (isUsernameExist) {
        return res.status(409).json({
          status: 'gagal',
          message: 'Username telah digunakan'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.createUser({
        username,
        email,
        hashedPassword
      });

      res.status(201).json({
        status: 'berhasil',
        message: 'Register telah berhasil dilakukan',
        data: {
          user
        }
      });
    } catch (error) {
      console.log(error);
      if (error.message.includes('User dengan email ini sudah ada')) {
        return res.status(409).json({
          status: 'gagal',
          message: error.message
        });
      }

      return res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami mengalami error',
      });
    }

  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.getUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          status: 'gagal',
          message: 'Email atau password salah, periksa kembali'
        });
      }

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role
      };
      const accessToken = tokenManager.generateAccessToken(payload);
      const refreshToken = tokenManager.generateRefreshToken(payload);

      await authModel.addRefreshToken(refreshToken, user.id);

      res.status(200).json({
        status: 'berhasil',
        message: 'Login berhasil',
        data: {
          accessToken,
          refreshToken
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami mengalami error'
      });
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.body;

      const decoded = tokenManager.verifyRefreshToken(refreshToken);
      await authModel.verifyTokenExists(refreshToken);

      const newAccessToken = tokenManager.generateAccessToken({
        id: decoded.id,
        username: decoded.username,
        role: decoded.role
      });

      res.status(200).json({
        status: 'berhasil',
        data: {
          accessToken: newAccessToken
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'Refresh Token Tidak Valid'
      });
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.body;

      await authModel.verifyTokenExists(refreshToken);
      await authModel.deleteRefreshToken(refreshToken);

      res.status(200).json({
        status: 'berhasil',
        message: 'Berhasil logout'
      });
    } catch (error) {
      res.status(400).json({
        status: 'gagal',
        message: 'Refresh Token tidak valid'
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();

      res.status(200).json({
        status: 'berhasil',
        data: {
          users
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami mengalami error'
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userModel.deleteUserById(id);

      res.status(200).json({
        status: 'berhasil',
        message: 'User berhasil dihapus'
      });
    } catch (error) {
      if (error.message === 'User tidak ditemukan') {
        return res.status(404).json({
          status: 'gagal',
          message: error.message
        });
      }

      return res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami mengalami error saat menghapus data'
      });
    }
  }

  async getUsersById(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.getUserById(id);

      res.status(200).json({
        status: 'berhasil',
        data: {
          user
        }
      });
    } catch (error) {
      if (error.message === 'User tidak ditemukan') {
        return res.status(404).json({
          status: 'gagal',
          message: error.message
        });
      }

      return res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami mengalami error saat mengambil data'
      });
    }
  }

  async updateUserById(req, res) {
    try {
      const { id } = req.params;
      const { username, email, role } = req.body;

      const updatedUser = await userModel.updateUserById(id, { username, email, role });

      res.status(200).json({
        status: 'berhasil',
        message: 'User berhasil diperbarui',
        data: {
          user: updatedUser
        }
      });
    } catch (error) {
      if (error.message === 'User tidak ditemukan') {
        return res.status(404).json({
          status: 'gagal',
          message: error.message
        });
      }

      return res.status(500).json({
        status: 'gagal',
        message: 'Sistem kami mengalami error saat memperbarui data'
      });
    }

  }
}

module.exports = new UserController();