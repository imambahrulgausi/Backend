const express = require('express');
const app = express();
const port = 8080

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