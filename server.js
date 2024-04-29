const express = require ('express'); 
const routerMhs = require('./routes/mahasiswa')
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routerMhs)

app.get('/', (req, res) => {
    res.send('server page')
});

app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`)
});