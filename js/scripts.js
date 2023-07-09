let precioFinal = 0
// CLASES
//Constructor de productos que se usaria si el dueño de la 
//tienda quisiera agregar nuevos
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

// ARRAYS
// Productos
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
// Items del carrito
const arrayCarrito = [];


function mostrarCatalogo (catalogo){
    let seccionProductos = document.getElementById('divDestacados');
    seccionProductos.innerHTML = '';
    for (item = 0; item < catalogo.length; item++){
        let producto = catalogo[item];
        let card = document.createElement('div');
        card.className = "d-flex justify-content-center";
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
        const boton = document.getElementById(`agregar-${producto.id}`);
        boton.addEventListener('click', () => {agregarCarrito(producto)});
    }
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
}

function mostrarCarrito() {
    let tablaFactura = document.getElementById('facturaBody');
    tablaFactura.innerHTML = '';
    for (item = 0; item < arrayCarrito.length; item++){
        let elemento = arrayCarrito[item];
        let itemFactura = document.createElement('tr');
        itemFactura.className = 'itemTicket';
        itemFactura.innerHTML = `   <th scope="row">${elemento.cantidad}</th>
                                    <td>${elemento.nombre}</td>
                                    <td>$ ${(elemento.precio*elemento.cantidad).toLocaleString()}</td>`;
        tablaFactura.appendChild(itemFactura);
    }
    let itemTotal = document.createElement('tr');
    itemTotal.innerHTML = `<th class="text-end" colspan="2" scope="row">Total:</th>
    <td>$ ${(arrayCarrito.reduce((total, producto) => total + (producto.precio*producto.cantidad), 0)).toLocaleString()}</td>`
    tablaFactura.appendChild(itemTotal);
}

//INICIO DEL PROGRAMA
mostrarCatalogo(catalogo)
console.log(arrayCarrito);
