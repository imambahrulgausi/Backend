const connection = require('../db/db')


module.exports = {
    getMhs : (req, res) => {
        const qstring = "SELECT * FROM mahasiswa";
        connection.query(qstring, (err,data) => {
            if (err) {
                console.log("error:", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat get data"
                });
            }
            else res.send(data)
        })
    },

    getMhsByNim: (req, res) => {
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
    },

    create: (req,res) => {
        // const mahasiswaBaru = req.body;
        const {nim, nama, angkatan,prodi} = req.body
    
        connection.query("INSERT INTO mahasiswa values (?,?,?,?) ", [nim, nama, angkatan,prodi], (err) => {
            if (err) {
                console.log("error :", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat insert data"
                });
            }
            else
                res.send(req.body)
        })
    },

    update: (req,res) => {
        const nim = req.params.nim;
        const n = req.body;
        const qstring = `UPDATE mahasiswa
                        SET nama = '${n.nama}', angkatan = '${n.angkatan}',prodi = '${n.kelas}'
                        WHERE nim = '${nim}'`
        connection.query(qstring, (err,data) => {
            if(err) {
                res.status(500).send({
                    message: "Error updating mahasiswa with nim" + nim
                });
            }
            else if(data.affectedRows ==0){
                res.status(404),send({
                    message: `Not found mahasiswa with nim ${nim}.`
                });
            }
            else {
                console.log("update mahasiswa: ", {nim: nim, ...n});
                res.send({nim: nim, ...n});
            }
        })
    },

    delete: (req,res) => {
        const nim = req.params.nim
        const qstring = `DELETE FROM mahasiswa WHERE nim = '${nim}'`
        connection.query(qstring, (err, data) => {
            if(err) {
                res.status(500).send({
                    message: "Error deleting mahasiswa with nim " + nim
                });
            }
            else if (data.affectedRows == 0){
                res.status(404).send({
                    message: `Not found mahasiswa with nim ${nim}.`
                });
            }
            else res.send(`mahasiswa dengan nim = ${nim} telah terhapus`)
        });
    }
}