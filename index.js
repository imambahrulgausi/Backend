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
    database: 'matakuliah'
});

connection.connect(error => {
    if (error) {
        console.log(error)
    };
    console.log('terhubung ke database kuliah-dev')
})

app.get('/', (req, res) => {
    const qstring = "SELECT * FROM matakuliah";
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


app.post('/', (req,res) => {
    // const matakuliahBaru = req.body;
    const {kodeMK, namaDosen, matkul, kelas} = req.body

    connection.query("INSERT INTO matakuliah values (?,?,?,?) ", [kodeMK, namaDosen, matkul, kelas], (err) => {
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

app.get('/:kodeMK', (req, res) => {
    const qstring = `SELECT * FROM matakuliah WHERE kodeMK = '${req.params.kodeMK}'`;
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

app.put('/:kodeMK', (req, res) => {
    const kodeMK = req.params.kodeMK;
    const MK = req.body;
    const qstring = `UPDATE matakuliah 
                    SET namaDosen = ?, matkul = ?, kelas = ?
                    WHERE kodeMK = ?`;
    connection.query(qstring, [MK.namaDosen, MK.matkul, MK.kelas, kodeMK], (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error updating matakuliah with kodeMK " + kodeMK
            });
        } else if (data.affectedRows == 0) {
            res.status(404).send({
                message: `Not found matakuliah with kodeMK ${kodeMK}.`
            });
        } else {
            console.log("update matakuliah: ", { kodeMK: kodeMK, ...MK });
            res.send({ kodeMK: kodeMK, ...MK });
        }
    });
});


app.delete('/:kodeMK', (req,res) => {
    const kodeMK = req.params.kodeMK
    const qstring = `DELETE FROM matakuliah WHERE kodeMK = '${kodeMK}'`
    connection.query(qstring, (err, data) => {
        if(err) {
            res.status(500).send({
                message: "Error deleting matakuliah with kodeMK " + kodeMK
            });
        }
        else if (data.affectedRows == 0){
            res.status(404).send({
                message: `Not found matakuliah with kodeMK ${kodeMK}.`
            });
        }
        else res.send(`matakuliah dengan kodeMK = ${kodeMK} telah terhapus`)
    });
})


app.get('/', (req, res) => {
    res.send('server page')
});

app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`)
});