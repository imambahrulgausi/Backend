const express = require('express');
const mysql = require("mysql2");
const app = express();
const port = 2601;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tugas-3'
});

connection.connect(error => {
    if (error) {
        console.log(error)
    };
    console.log('terhubung ke database kuliah-dev')
});

app.get('/', (req, res) => {
    res.send('server page');
});

app.get('/data', (req, res) => {
    const qstring = "SELECT * FROM `tugas-3`";
    connection.query(qstring, (err, data) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat get data"
            });
        } else {
            res.send(data);
        }
    });
});

app.post('/data', (req, res) => {
    const { nim, nama, kelas, prodi } = req.body;

    connection.query("INSERT INTO `tugas-3` VALUES (?, ?, ?, ?)", [nim, nama, kelas, prodi], (err) => {
        if (err) {
            console.log("error :", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat insert data"
            });
        } else {
            res.send(req.body);
        }
    });
});

app.get('/data/:nim', (req, res) => {
    const qstring = `SELECT * FROM \`tugas-3\` WHERE nim = '${req.params.nim}'`;
    connection.query(qstring, (err, data) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat get data"
            });
        } else {
            res.send(data);
        }
    });
});

app.put('/data/:nim', (req, res) => {
    const nim = req.params.nim;
    const { nama, kelas, prodi } = req.body;
    const qstring = `UPDATE \`tugas-3\` 
                    SET nama = ?, kelas = ?, prodi = ?
                    WHERE nim = ?`;
    connection.query(qstring, [nama, kelas, prodi, nim], (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating tugas-3 with nim " + nim
            });
        } else if (data.affectedRows == 0) {
            res.status(404).send({
                message: `Not found tugas-3 with nim ${nim}.`
            });
        } else {
            console.log("update tugas-3: ", { nim: nim, nama: nama, kelas: kelas, prodi: prodi });
            res.send({ nim: nim, nama: nama, kelas: kelas, prodi: prodi });
        }
    });
});

app.delete('/data/:nim', (req,res) => {
    const nim = req.params.nim;
    const qstring = `DELETE FROM \`tugas-3\` WHERE nim = '${nim}'`;
    connection.query(qstring, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting tugas-3 with nim " + nim
            });
        } else if (data.affectedRows == 0) {
            res.status(404).send({
                message: `Not found tugas-3 with nim ${nim}.`
            });
        } else {
            res.send(`tugas-3 dengan nim = ${nim} telah terhapus`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`);
});
