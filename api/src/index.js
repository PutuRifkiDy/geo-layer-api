require('dotenv').config();
const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/userRoutes.js');
const pointRoutes = require('./routes/pointRoutes.js');
const objectTypeRoutes = require('./routes/objectTypeRoutes.js');
const lpkDetailRoutes = require('./routes/lpkDetailRoutes.js');
const lpkProgramRoutes = require('./routes/lpkProgramRoutes.js');
const lpkGalleryRoutes = require('./routes/lpkGalleryRoutes.js');

const PORT = process.env.PORTAPI || 4000;

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRoutes);
app.use('/object-types', objectTypeRoutes);
app.use('/points', pointRoutes);
app.use('/lpk-details', lpkDetailRoutes);
app.use('/lpk-programs', lpkProgramRoutes);
app.use('/lpk-galleries', lpkGalleryRoutes);

app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});