const express = require('express')
const routerMhs = express.Router()
const ctrMhs = require("../controllers/mahasiswa")

routerMhs.get('/', ctrMhs.getMhs)

routerMhs.post('/', (req,res) => {
    // const mahasiswaBaru = req.body;
    const {nim,nama,angkatan,prodi} = req.body

    connection.query("INSERT INTO mahasiswa values (?,?,?,?) ", [nim,nama,angkatan,prodi], (err) => {
        if (err) {
            console.log("error :", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat insert data"
            });
        }
        else
            res.send(req.body)
    })
});

routerMhs.get('/:nim', (req, res) => {
    const qstring = `SELECT * FROM mahasiswa WHERE nim = '${req.params.nim}'`;
    connection.query(qstring, (err,data) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat get data"
            });
        }
        else res.send(data)
    })
});

routerMhs.put('/:nim', (req,res) => {
    const nim = req.params.nim;
    const mhs = req.body;
    const qstring = `UPDATE mahasiswa 
                    SET nama = '${mhs.nama}', angkatan = '${mhs.angkatan}', prodi = '${mhs.prodi}'
                    WHERE nim = '${nim}'`
    connection.query(qstring, (err,data) => {
        if(err) {
            res.status(500).send({
                message: "Error updating mahasiswa with NIM" + nim
            });
        }
        else if(data.affectedRows ==0){
            res.status(404),send({
                message: `Not found mahasiswa with NIM ${nim}.`
            });
        }
        else {
            console.log("update mahasiswa: ", {nim: nim, ...mhs});
            res.send({nim: nim, ...mhs});
        }
    })
})

routerMhs.delete('/:nim', (req,res) => {
    const nim = req.params.nim
    const qstring = `DELETE FROM mahasiswa WHERE nim = '${nim}'`
    connection.query(qstring, (err, data) => {
        if(err) {
            res.status(500).send({
                message: "Error deleting mahasiswa with NIM " + nim
            });
        }
        else if (data.affectedRows == 0){
            res.status(404).send({
                message: `Not found mahasiswa with NIM ${nim}.`
            });
        }
        else res.send(`Mahasiswa dengan nim = ${nim} telah terhapus`)
    });
})

module.exports = routerMhs;