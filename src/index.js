require('dotenv').config();
const express = require('express');

const usersRoutes = require('./routes/userRoutes.js');
const pointRoutes = require('./routes/pointRoutes.js');

const PORT = process.env.PORTAPI || 4000;

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRoutes);
app.use('/points', pointRoutes);

app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});