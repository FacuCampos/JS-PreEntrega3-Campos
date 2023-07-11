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
    new Producto('catan', 'Catan', 23300, 'Devir', 'Catan_base.jpg', 'foto del catan'), 
    new Producto('bang', 'Bang!', 18000, 'Da Vinci Games', 'bang.jpg', 'foto del bang'),
    new Producto('sushiGoParty', 'Sushi Go! Party', 15000, 'Devir', 'sushi-go-party.jpg', 'foto del sushi go party'), 
    new Producto('cuboRubik', 'Cubo Rubik', 7200, 'Hasbro', 'cubo-rubik.jpg', 'foto del cubo rubik'), 
    new Producto('manualDnD', 'Manual de Dungeons and Dragons', 32000, 'Wizards of the Coast', 'manualDnD.jpg', 'foto del manual de DnD'), 
    new Producto('setDados', 'Set de Dados', 4000, 'T&G', 'setDados.jpg', 'foto del set de dados'),
    new Producto('manualCoC', 'Manual de La Llamada de Cthulhu', 28000, 'Edge Entertainment', 'manualCthulhu7Ed.jpg', 'foto del manual de CoC 7Ed'),
    new Producto('alice', 'Alice ha desaparecido', 7600, 'Devir', 'Alice-ha-desaparecido.jpg', 'foto del alice ha desaparecido'),
    new Producto('stoneAge', 'Stone Age', 28200, 'Devir', 'Stone_age.jpg', 'foto del stone age'),
];