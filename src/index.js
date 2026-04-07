require('dotenv').config();
const express = require('express');

const PORT = process.env.PORTAPI || 4000;

// buat server
const app = express();

// belajar basic routing
// app.method(path, handler);
// pake method use, kita bisa pake semua method dan dihandle di use, dan biasanya bisa dipake middle ware karena bisa pake semua methode
// app.use('/', (request, response, next) => {
//   response.send('hello world');
// });

// kita buat spesifik method
app.get('/', (req, res) => {
  res.send('hello get method');
});

app.post('/', (req, res) => {
  // res.send('hello post method');
  // bisa kirim data ke client berupaa text
  // bisa juga kirim berupa html
  // bisa juga kirim berupa json
  // kalo json .methodnya beda yaitu => .json
  res.json({
    nama: "Rifki",
    email: "puturifki56@gmail.com"
  });
  // karena responsenya json berarti untuk api
});

// mendengarkan port berapa project expressnya
app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});