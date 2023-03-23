const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const modeloProductos = require("./models/").Productos
const modeloCategorias = require("./models/").Categorias


//RUTAS PRODUCTOS GET
app.get("/productos", (req, res) => {
    modeloProductos.findAll()
    .then(productos => {
        res.status(200).send(productos)
    })/*  */
    .catch(error => {
        console.log(error)
        res.status(500).send("Error al cargar los productos")
    })
})

//RUTAS PRODUCTOS ADD
app.post("/productos", (req, res) => {
    let {nombre, descripcion, precio, stock, idCategoria} = req.body;
    modeloProductos.create({
        nombre, descripcion, precio, stock, idCategoria
    })
    .then(producto => {
        console.log(producto)
        res.status(201).send("Producto agregado correctamente.")
    })
    .catch(error => {
        console.log(error)
        res.status(500).send("Error al cargar los productos.")
    })
})


//RUTAS CATEGORIA
app.get("/categorias", (req, res) => {
    modeloCategorias.findAll()
    .then(categorias => {
        res.status(200).send(categorias)
    })
    .catch(error => {
        console.log(error)
        res.status(500).send("Error al cargar los categorias")
    })
})

app.post("/categorias", (req, res) => {
    let nombre = req.body.nombre
    modeloCategorias.create({nombre})
    .then(categorias => {
        console.log(categorias)
        res.status(201).send("Categoria agregada.")
    })
    .catch(error => {
        console.log(error)
        res.status(500).send("Error al crear las categorias")
    })
})





app.listen(3000, () => console.log("http://localhost:3000/"))