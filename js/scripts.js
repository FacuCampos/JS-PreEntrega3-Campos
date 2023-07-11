// Catalogo de productos
class Producto{
    id;
    nombre;
    precio;
    editorial;
    imagen;
    alternativo;

    constructor(id, nombre, precio, editorial, imagen, alternativo){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.editorial = editorial;
        this.imagen = imagen;
        this.alternativo = alternativo;
    }
}

const catalogo = [
    new Producto('catan', 'Catan', 35000, 'Devir', 'foto_generica.jpg', 'Texto alternativo'), 
    new Producto('bang', 'Bang!', 22000, 'Da Vinci Games', 'foto_generica.jpg', 'Texto alternativo'),
    new Producto('sushiGoParty', 'Sushi Go! Party', 18000, 'Devir', 'foto_generica.jpg', 'Texto alternativo'), 
    new Producto('cuboRubik', 'Cubo Rubik', 5800, 'Hasbro', 'foto_generica.jpg', 'Texto alternativo'), 
    new Producto('manualDnD', 'Manual de Dungeons and Dragons', 21500, 'Wizards of the Coast', 'foto_generica.jpg', 'Texto alternativo'), 
    new Producto('setDados', 'Set de Dados', 7750, 'T&G', 'foto_generica.jpg'),
    new Producto('manualCoC', 'Manual de La Llamada de Cthulhu', 25000, 'Edge Entertainment', 'foto_generica.jpg', 'Texto alternativo'),
    new Producto('alice', 'Alice ha desaparecido', 7900, 'Devir', 'foto_generica.jpg', 'Texto alternativo'),
    new Producto('stoneAge', 'Stone Age', 19500, 'Devir', 'foto_generica.jpg', 'Texto alternativo'),
];


// Constructor de cada item de la factura
class ItemFactura{
    nombre;
    precio;
    cantidad;

    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}


// Items del carrito
let arrayCarrito = [];

function inicio(){
    document.addEventListener('DOMContentLoaded', traerCarrito);
    mostrarCatalogo();
}


function traerCarrito(){
    arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();
}


function mostrarCatalogo (){
    let seccionProductos = document.getElementById('divDestacados');
    seccionProductos.innerHTML = '';
    catalogo.forEach((producto) => {
        let card = document.createElement('div');
        card.classList.add('d-flex', 'justify-content-center');
        card.innerHTML = `  <figure  class="producto">
                                <div>
                                    <img src="./img/productos/${producto.imagen}" alt="${producto.alternativo}">
                                </div>
                                <div class="info-producto">
                                    <figcaption>${producto.nombre}</figcaption>
                                    <p>$ ${producto.precio}</p>
                                    <button id="agregar-${producto.id}">+ Agregar al carrito</button>
                                </div>
                            </figure>`;
        seccionProductos.appendChild(card);
        const botonAgregar = document.getElementById(`agregar-${producto.id}`);
        botonAgregar.addEventListener('click', () => {agregarCarrito(producto)});
    })
}


function agregarCarrito (eleccion){
    if(!(arrayCarrito.some((el) => el.nombre === eleccion.nombre))){
        let nuevoItem = new ItemFactura(eleccion.nombre, eleccion.precio, 1);
        arrayCarrito.push(nuevoItem);
    }else{
        let indice = arrayCarrito.findIndex((el) => el.nombre === eleccion.nombre);
        arrayCarrito[indice].cantidad++;
    }
    mostrarCarrito()
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
}


function mostrarCarrito() {
    let tablaFactura = document.getElementById('facturaBody');
    tablaFactura.innerHTML = '';
    arrayCarrito.forEach((producto) => {
        let itemFactura = document.createElement('tr');
        itemFactura.className = 'itemTicket';
        itemFactura.innerHTML = `   <th scope="row"> 
                                        <div class="celdaCantidad">
                                            <p>${producto.cantidad}</p>
                                        </div>
                                    </th>
                                    <td><div><p>${producto.nombre}</p></div></td>
                                    <td><div><p>$ ${(producto.precio*producto.cantidad).toLocaleString()}</p></div></td>`;
        tablaFactura.appendChild(itemFactura);
    })

    let itemTotal = document.createElement('tr');
    itemTotal.innerHTML = ` <th colspan="2" scope="row" id="total">Total:</th>
                            <td colspan="1">
                                <div><p>$ ${(arrayCarrito.reduce((total, producto) => total + (producto.precio*producto.cantidad), 0)).toLocaleString()}</p></div>
                            </td>`
    tablaFactura.appendChild(itemTotal);
    
    let botonLimpiar = document.createElement('button');
    botonLimpiar.className = 'borrarCarrito'
    botonLimpiar.innerText = 'Limpiar';
    tablaFactura.appendChild(botonLimpiar);
    botonLimpiar.addEventListener('click', () => {limpiarCarrito()})
}


function limpiarCarrito (){
    arrayCarrito.splice(0,arrayCarrito.length);
    let carritoAlmacenado = JSON.parse(localStorage.getItem("carrito"));
    carritoAlmacenado = [];
    localStorage.setItem("carrito", JSON.stringify(carritoAlmacenado));
    mostrarCarrito()
}


//INICIO DEL PROGRAMA
inicio()