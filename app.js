const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aplikasi_sederhana',
});

// app.get('/', (req, res) => {
//  res.send('Halo Semuanya! Kami kelompok 4')
//})

app.get('/show', (req, res) => {
  pool.query('SELECT ID,Nama,Harga,Keterangan FROM produk;', function (error, results, fields) {

    // benar 
    try {
      if (error) throw error;
      res.send({ status: 'true', data: results })
    } catch (error) {
      console.log(error)
      res.send({ status: 'false', message: 'Terjadi Kesalahan' });
    }
  });
})

app.post('/insert', (req, res) => {
  let Nama = req.body.Nama
  let Harga = req.body.Harga
  let Keterangan = req.body.Keterangan

  pool.query('INSERT INTO produk (Nama,Harga,Keterangan) VALUES ("' + Nama + '","' + Harga + '","' + Keterangan + '");',
    function (error, results, fields) {
      try {
        if (error) throw error;
        res.send({ status: 'true', message: 'Data berhasil ditambahkan' })
      } catch (error) {
        console.log(error);
        res.send({ status: 'false', message: 'Terjadi kesalahan' })
      }
    });
})

app.post('/update', (req, res) => {
  let IdData = req.body.IdData
  let Nama = req.body.Nama
  let Harga = req.body.Harga
  let Keterangan = req.body.Keterangan

  pool.query('UPDATE produk SET Nama="' + Nama + '", Harga="' + Harga + '", Keterangan="' + Keterangan + '" WHERE ID="' + IdData + '";',
    function (error, results, fields) {
      try {
        if (error) throw error;
        res.send({ status: 'true', message: 'Data berhasil diubah' })
      } catch (error) {
        console.log(error);
        res.send({ status: 'false', message: 'Terjadi kesalahan' })
      }
    });
})

app.post('/delete', (req, res) => {
  let IdData = req.body.IdData

  pool.query('DELETE FROM produk WHERE ID="' + IdData + '";', function (error, results, fields) {
    try {
      if (error) throw error;
      res.send({ status: 'true', message: 'Data berhasil dihapus' })
    } catch (error) {
      console.log(error);
      res.send({ status: 'false', message: 'Terjadi kesalahan !' })
    }
  });
})

app.listen(port, () => {
  console.log(`Selamat anda berhasil menjalankan port ${port}`)
})