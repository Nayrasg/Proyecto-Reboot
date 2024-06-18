import camiseta1 from '../images/camiseta1.jpg';
import camiseta2 from '../images/camiseta2.jpg';
import camiseta3 from '../images/camiseta3.jpg';
import camiseta4 from '../images/camiseta4.jpg';
import camiseta5 from '../images/camiseta5.jpg';
import camiseta6 from '../images/camiseta6.jpg';
import camiseta7 from '../images/camiseta7.jpg';
import camiseta8 from '../images/camiseta8.jpg';
import camiseta9 from '../images/camiseta9.jpg';
import camiseta10 from '../images/camiseta10.jpg';
import camiseta11 from '../images/camiseta11.jpg';
import camiseta12 from '../images/camiseta12.jpg';
import camiseta13 from '../images/camiseta13.jpg';
import camiseta14 from '../images/camiseta14.jpg';
import camiseta15 from '../images/camiseta15.jpg';
import camiseta16 from '../images/camiseta16.jpg';
import camiseta17 from '../images/camiseta17.jpg';
import camiseta18 from '../images/camiseta18.jpg';
import camiseta19 from '../images/camiseta19.jpg';
import camiseta20 from '../images/camiseta20.jpg';
import camiseta21 from '../images/camiseta21.jpg';
import camiseta22 from '../images/camiseta22.jpg';
import camiseta23 from '../images/camiseta23.jpg';
import camiseta24 from '../images/camiseta24.jpg';

const allProducts = {
    destacados: [
        { id: 1, title: 'Constelación', price: 19.90, image: camiseta1, description: 'Descripción del Producto 1', tejido: 'Algodón', envio: 2.50, stock: { S: 10, M: 15, L: 8, XL: 5 }},
        { id: 2, title: 'Producto 2', price: 19.90, image: camiseta2, description: 'Descripción del Producto 2', tejido: 'Poliéster', envio: 2.50, stock: { S: 12, M: 10, L: 5, XL: 2 }},
        { id: 3, title: 'Producto 3', price: 19.90, image: camiseta3, description: 'Descripción del Producto 3', tejido: 'Lana', envio: 2.50, stock: { S: 8, M: 12, L: 7, XL: 3 }},
        { id: 4, title: 'Producto 4', price: 19.90, image: camiseta4, description: 'Descripción del Producto 4', tejido: 'Seda', envio: 2.50, stock: { S: 5, M: 8, L: 3, XL: 1 }},
        { id: 5, title: 'Producto 5', price: 19.90, image: camiseta5, description: 'Descripción del Producto 5', tejido: 'Lino', envio: 2.50, stock: { S: 10, M: 10, L: 10, XL: 10 }},
        { id: 6, title: 'Producto 6', price: 19.90, image: camiseta6, description: 'Descripción del Producto 6', tejido: 'Sintético', envio: 2.50, stock: { S: 2, M: 3, L: 4, XL: 5 }},
    ],
    nuevas: [
        { id: 7, title: 'Producto 7', price: 19.90, image: camiseta7, description: 'Descripción del Producto 7', tejido: 'Algodón', envio: 2.50, stock: { S: 7, M: 9, L: 4, XL: 6 }},
        { id: 8, title: 'Producto 8', price: 19.90, image: camiseta8, description: 'Descripción del Producto 8', tejido: 'Poliéster', envio: 2.50, stock: { S: 11, M: 10, L: 5, XL: 3 }},
        { id: 9, title: 'Producto 9', price: 19.90, image: camiseta9, description: 'Descripción del Producto 9', tejido: 'Lana', envio: 2.50, stock: { S: 6, M: 7, L: 2, XL: 4 }},
        { id: 10, title: 'Producto 10', price: 19.90, image: camiseta10, description: 'Descripción del Producto 10', tejido: 'Seda', envio: 2.50, stock: { S: 5, M: 6, L: 3, XL: 2 }},
        { id: 11, title: 'Producto 11', price: 19.90, image: camiseta11, description: 'Descripción del Producto 11', tejido: 'Lino', envio: 2.50, stock: { S: 8, M: 5, L: 4, XL: 3 }},
        { id: 12, title: 'Producto 12', price: 19.90, image: camiseta12, description: 'Descripción del Producto 12', tejido: 'Sintético', envio: 2.50, stock: { S: 6, M: 5, L: 4, XL: 3 }},
    ],
    populares: [
        { id: 13, title: 'Producto 13', price: 19.90, image: camiseta13, description: 'Descripción del Producto 13', tejido: 'Algodón', envio: 2.50, stock: { S: 3, M: 5, L: 7, XL: 9 }},
        { id: 14, title: 'Producto 14', price: 19.90, image: camiseta14, description: 'Descripción del Producto 14', tejido: 'Poliéster', envio: 2.50, stock: { S: 6, M: 5, L: 4, XL: 3 }},
        { id: 15, title: 'Producto 15', price: 19.90, image: camiseta15, description: 'Descripción del Producto 15', tejido: 'Lana', envio: 2.50, stock: { S: 8, M: 9, L: 10, XL: 11 }},
        { id: 16, title: 'Producto 16', price: 19.90, image: camiseta16, description: 'Descripción del Producto 16', tejido: 'Seda', envio: 2.50, stock: { S: 5, M: 4, L: 3, XL: 2 }},
        { id: 17, title: 'Producto 17', price: 19.90, image: camiseta17, description: 'Descripción del Producto 17', tejido: 'Lino', envio: 2.50, stock: { S: 10, M: 9, L: 8, XL: 7 }},
        { id: 18, title: 'Producto 18', price: 19.90, image: camiseta18, description: 'Descripción del Producto 18', tejido: 'Sintético', envio: 2.50, stock: { S: 5, M: 4, L: 3, XL: 2 }},
    ],
    ofertas: [
        { id: 19, title: 'Producto 19', price: 19.90, image: camiseta19, description: 'Descripción del Producto 19', tejido: 'Algodón', envio: 2.50, stock: { S: 3, M: 6, L: 9, XL: 12 }},
        { id: 20, title: 'Producto 20', price: 19.90, image: camiseta20, description: 'Descripción del Producto 20', tejido: 'Poliéster', envio: 2.50, stock: { S: 7, M: 8, L: 5, XL: 4 }},
        { id: 21, title: 'Producto 21', price: 19.90, image: camiseta21, description: 'Descripción del Producto 21', tejido: 'Lana', envio: 2.50, stock: { S: 4, M: 5, L: 6, XL: 7 }},
        { id: 22, title: 'Producto 22', price: 19.90, image: camiseta22, description: 'Descripción del Producto 22', tejido: 'Seda', envio: 2.50, stock: { S: 8, M: 7, L: 6, XL: 5 }},
        { id: 23, title: 'Producto 23', price: 19.90, image: camiseta23, description: 'Descripción del Producto 23', tejido: 'Lino', envio: 2.50, stock: { S: 10, M: 9, L: 8, XL: 7 }},
        { id: 24, title: 'Producto 24', price: 19.90, image: camiseta24, description: 'Descripción del Producto 24', tejido: 'Sintético', envio: 2.50, stock: { S: 6, M: 5, L: 4, XL: 3 }},
    ],
};

export default allProducts;
