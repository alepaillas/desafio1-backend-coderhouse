// funcion de chatGPT para generar UUIDs que usaremos para identificar los productos mas adelante

/*
  Utiliza una expresión regular /[xy]/g para hacer coincidir cada caracter 'x' y 'y' en la cadena de plantilla del UUID.
  Para cada caracter coincidente, genera un dígito hexadecimal aleatorio (r) utilizando Math.random() y manipulación de bits (| 0).
  Para los caracteres 'x', utiliza el dígito aleatorio directamente.
  Para los caracteres 'y', aplica operaciones específicas de bits ((r & 0x3 | 0x8)) para asegurar que el UUID cumpla con la especificación de la versión 4 de UUID.
  Convierte cada dígito aleatorio en una cadena hexadecimal utilizando .toString(16) y devuelve la cadena UUID final.
*/

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	const r = Math.random() * 16 | 0;
	const v = c === 'x' ? r : (r & 0x3 | 0x8); // operador ternario
	return v.toString(16);
    });
}

// Example usage:
// const uuid = generateUUID();
// console.log(uuid); // Output: something like "3d16f03e-08b4-4c08-9e1d-78bfbf7b0ac5"


// clases con ES11

class Product {
    // #variable es sintaxis de variables privadas
    #title; // name seria mejor pero asi lo pide la consigna
    #description;
    #price;
    #thumbnail;
    #code; // pesimo nombre de variable pero es lo que pide la consigna, es para un codigo de barra
    #stock;
    #id
    
    // ya que javascript es un lenguaje horrible hay que cuidar de construir nuestro producto
    // de manera distinta si le pasamos un objeto a addProduct
    // sino llegamos a esto Product: [object Object], Price: undefined, Id: d437c6b2-fbbe-4c90-b9b3-12275ec1e015
    constructor(titleOrObj, price, description, thumbnail, code, stock) {
        if (typeof titleOrObj === 'object') {
            const { title, price, description, thumbnail, code, stock } = titleOrObj;
            this.#title = title;
            this.#price = price;
            this.#description = description;
            this.#thumbnail = thumbnail;
            this.#code = code;
            this.#stock = stock;
        } else {
            this.#title = titleOrObj;
            this.#price = price;
            this.#description = description;
            this.#thumbnail = thumbnail;
            this.#code = code;
            this.#stock = stock;
        }
        this.#id = generateUUID(); // generamos un id unico
    }

    getTitle() {
	return this.#title;
    }

    getPrice() {
	return this.#price;
    }
    
    getId() {
	return this.#id
    }
}

class ProductManager {
    #products;

    constructor() {
	this.#products = []; // iniciamos con arreglo vacio
    }

    addProduct(product) {
	this.#products.push(product); // push agrega al final del arreglo
    }

    getProducts() {
	return this.#products;
    }

    getProductById(productID) {
	const product = this.#products.find(product => product.getId() === productId);
	return product ? product : console.error("Not found."); // if product existe return else not found
    }
}

const manager = new ProductManager();
console.log(manager.getProducts());

const productoPrueba = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
};

const product1 = new Product(productoPrueba);

manager.addProduct(product1);

const products = manager.getProducts();

// iteramos nuestro arreglo de productos para obtener todos los productos
products.forEach(product => {
    console.log(`Product: ${product.getTitle()}, Price: ${product.getPrice()}, Id: ${product.getId()}`) // template literal
})
