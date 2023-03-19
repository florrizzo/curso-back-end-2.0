
mutation crear { createProducto(datos: {nombre: "Volcan de Chocolate", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO6UELmfHgjh168nW0KkpF5F4HAt2OPFYVRA&usqp=CAU", descripcion: "Biscocho relleno de chocolate", precio: 3200}) { id nombre descripcion url precio } }

query getUno { getProducto(id: "2460343e060579d8e4e2") { id nombre precio } }

query todos { getProductos { id nombre url descripcion precio } }

query getFiltro { getProductos(campo: "nombre", valor: "Brownie") { nombre id precio } }

mutation updateUno { updateProducto(id: "2144b8e10efec7af1f33", datos: {nombre: "Budín de limon", precio: 2000}) { id nombre precio } }

mutation deleteProducto { deleteProducto(id: "f6b9ee173fb105a8c1c2") { id nombre precio } }