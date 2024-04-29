const express = require('express');
const app = express();
const port = 8080

//body
app.use(express.json())

app.post('/mahasiswa', (req,res) => {
    const nim = req.body.nim;
    const nama = req.body.nama;
    const prodi = req.body.prodi;

    const msg = { status :"sukses",
                    data : {"nim": nim, "nama": nama, "prodi": prodi}};
    res.send(msg);
});

//request params 1
app.get('/mahasiswa/:nim',  (req,res) => {
    const nim =  req.params.nim;

    res.send(`mahasiswa dengan nim: ${nim} telah ditemukan`)
})

//request params 2
app.get('/mahasiswa/:nama/:nim',  (req,res) => {
    const nama =  req.params.nama;
    const nim = req.params.nim;

    res.send(`mahasiswa dengan nama: ${nama} dan nim: ${nim} telah ditemukan`)
})

//request query 1
app.get('/get-by-nim', (req,res) => {
    const nim =req.query.nim;

    res.send(`Mahasiswa dengan nim ${nim} telah ditemukan`)
})

//request query 2
app.get('/mahasiswa-nama', (req,res) => {
    const nim = req.query.nim;
    const nama = req.query.nama; 

    res.send(`Mahasiswa dengan nama ${nama} nim ${nim} telah ditemukan`)
})

app.get('/', (req,res) => {
    res.send('Project Backend')
})


app.post('/', (req,res) => {
    res.send('Project Backend berhasil')
})

app.delete('/', (req,res) => {
    res.send('Project Backend berhasil di hapus')
})

app.put('/', (req,res) => {
    res.send('Project Backend telah di perbarui')
})

app.listen(port, () => {
    console.log(`Server sedang berjalan pada localhost:${port}`)
})