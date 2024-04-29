const express = require('express')
const routerMhs = express.Router()
const ctrMhs = require("../controllers/mahasiswa")

routerMhs.get('/', ctrMhs.getMhs);


routerMhs.post('/', ctrMhs.create);

routerMhs.get('/:nim', ctrMhs.getMhsByNim);

routerMhs.put('/:nim', ctrMhs.update)

routerMhs.delete('/:nim', ctrMhs.delete)

module.exports = routerMhs;