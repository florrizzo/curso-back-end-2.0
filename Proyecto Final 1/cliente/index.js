let productos = [];
let htmlProductos = "";
let htmlForm = "";
let htmlCarritos = "";
let admin = false;
let checkAdmin = ";";
let carritos = [];

function validacionAdmin() {
  if (document.querySelector('input[id="check_admin"]:checked')) {
    admin = true;
  } else {
    admin = false;
  }
}

async function refreshProductos() {
  await fetch("http://localhost:8080/api/productos")
    .then((res) => res.json())
    .then((json) => {
      productos = json;
      htmlProductos = "";
      if (admin == true) {
        htmlForm = `<form onsubmit="return false">
            <label for="Nombre">Nombre:</label>
            <input type="text" id="Nombre" name="nombre">
            <label for="Descripcion">Descripcion:</label>
            <input type="text" id="Descripcion" name="descripcion">
            <label for="Codigo">Codigo:</label>
            <input type="text" id="Codigo" name="codigo">
            <label for="URL">URL:</label>
            <input type="text" id="URL" name="foto">
            <label for="Precio">Precio:</label>
            <input type="text" id="Precio" name="precio">
            <label for="Stock">Stock:</label>
            <input type="text" id="Stock" name="stock">
            <input type="submit" onclick="postearProducto(), refreshProductos()">
        </form>`;
        document.getElementById("post_product").innerHTML = htmlForm;
      } else {
        document.getElementById("post_product").innerHTML = "";
      }
      productos.forEach((element) => {
        htmlProductos += `
        <div class="card"> 
            <p>id: ${element.idProducto}</p>
            <p>${element.timestamp}</p>
            <p>Nombre: ${element.nombre}</p>
            <p>Descripción: ${element.descripcion}</p>
            <p>Código: ${element.codigo}</p>
            <p>Foto: ${element.foto}</p>
            <p>Precio: ${element.precio}</p>
            <p>Stock: ${element.stock}</p>`;
        if (admin == true) {
          htmlProductos += `
                <button onclick="actualizarProducto(${element.idProducto}), refreshProductos()">Actualizar</button>
                <button onclick="borrarProducto(${element.idProducto}), refreshProductos()">Eliminar</button>
            </div>`;
        } else {
          htmlProductos += `</div>`;
        }
      });
      document.getElementById("lista_productos").innerHTML = htmlProductos;
    })
    .catch((err) => {
      console.log(err);
    });
}

refreshProductos();

// const data = { 'nombre': 'Medialuna', 'descripcion': 'Panificado dulce', 'codigo': 3578, 'foto': '', 'precio': 1500, 'stock': 30 };

function postearProducto() {
  const data = {
    nombre: document.getElementById("Nombre").value,
    descripcion: document.getElementById("Descripcion").value,
    codigo: document.getElementById("Codigo").value,
    foto: document.getElementById("URL").value,
    precio: document.getElementById("Precio").value,
    stock: document.getElementById("Stock").value,
  };
  fetch("http://localhost:8080/api/productos", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function actualizarProducto(id) {
  const data = {
    nombre: document.getElementById("Nombre").value,
    descripcion: document.getElementById("Descripcion").value,
    codigo: document.getElementById("Codigo").value,
    foto: document.getElementById("URL").value,
    precio: document.getElementById("Precio").value,
    stock: document.getElementById("Stock").value,
  };
  const url = "http://localhost:8080/api/productos/" + id;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function borrarProducto(id) {
  const url = "http://localhost:8080/api/productos/" + id;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("Success");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function buscarProducto() {
  const id = document.getElementById("searchid").value;
  const url = `http://localhost:8080/api/productos/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      productos = json;
      htmlProductos = `
        <div class="card"> 
            <p>id: ${productos.idProducto}</p>
            <p>${productos.timestamp}</p>
            <p>Nombre: ${productos.nombre}</p>
            <p>Descripción: ${productos.descripcion}</p>
            <p>Código: ${productos.codigo}</p>
            <p>Foto: ${productos.foto}</p>
            <p>Precio: ${productos.precio}</p>
            <p>Stock: ${productos.stock}</p>
        </div>`;
      document.getElementById("producto_id").innerHTML = htmlProductos;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function refreshCarritos() {
  fetch("http://localhost:8080/api/carrito")
    .then((response) => response.json())
    .then((json) => {
      carritos = json;
      htmlCarritos = "";
      if (carritos.length > 0) {
        carritos.forEach((element) => {
          htmlCarritos += `
    <div class="card">
        <h2>Carrito: <span id="carritoid">${element.idCarrito}</span></h2>
        <div id="productos_carrito${element.idCarrito}"></div>
        <button onclick = "verProductosCarrito(${element.idCarrito})">Ver productos</button>
        <label for="carrito_producto_${element.idCarrito}">id del producto:</label>
        <input type="text" id="carrito_producto_${element.idCarrito}">
        <button onclick = "agregarProductoCarrito(${element.idCarrito})">Agregar producto</button>
        <button onclick = "eliminarProductoCarrito(${element.idCarrito})">Eliminar producto</button>
        <button onclick = "eliminarCarrito(${element.idCarrito})">Eliminar carrito</button>
    </div>`;
        });
      }
      document.getElementById("carritos").innerHTML = htmlCarritos;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

refreshCarritos();

function crearCarrito() {
  fetch("http://localhost:8080/api/carrito", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      refreshCarritos();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function eliminarCarrito(id) {
  const url = `http://localhost:8080/api/carrito/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const index = carritos.findIndex((object) => object.carritoid == id);
      carritos = carritos.splice(index, 1);
      refreshCarritos();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function verProductosCarrito(id) {
  const url = `http://localhost:8080/api/carrito/${id}/productos`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      let productosCarrito = json;
      console.log(productosCarrito);
      let htmlProductosCarrito = "";
      productosCarrito.forEach((element) => {
        htmlProductosCarrito += `
        <div class="card"> 
            <p>id: ${element.idProducto}</p>
            <p>${element.timestamp}</p>
            <p>Nombre: ${element.nombre}</p>
            <p>Descripción: ${element.descripcion}</p>
            <p>Código: ${element.codigo}</p>
            <p>Foto: ${element.foto}</p>
            <p>Precio: ${element.precio}</p>
            <p>Stock: ${element.stock}</p>
        </div>`;
      });
      document.getElementById(`productos_carrito${id}`).innerHTML =
        htmlProductosCarrito;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function agregarProductoCarrito(idCarrito) {
  const id_prod = document.getElementById(
    `carrito_producto_${idCarrito}`
  ).value;
  const url = `http://localhost:8080/api/carrito/${idCarrito}/productos/${id_prod}`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      refreshCarritos();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function eliminarProductoCarrito(idCarrito) {
  const id_prod = document.getElementById(
    `carrito_producto_${idCarrito}`
  ).value;
  const url = `http://localhost:8080/api/carrito/${idCarrito}/productos/${id_prod}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      refreshCarritos();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
