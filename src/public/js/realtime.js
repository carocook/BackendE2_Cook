let productsList = [];

const socket = io();

const form = document.getElementById("productForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const id = data.get("id");

    const product = {
      title: data.get("title"),
      description: data.get("description"),
      code: data.get("code"),
      price: Number(data.get("price")),
      stock: Number(data.get("stock")),
      category: data.get("category"),
    };

    if (id) {
      socket.emit("updateProduct", { id, updates: product });
    } else {
      socket.emit("newProduct", product);
    }

    form.reset();

    document.getElementById("formTitle").innerText = "Agregar Producto";
    document.getElementById("submitBtn").innerText = "Agregar";
  });
}

socket.on("updateProducts", (products) => {
  productsList = products;

  const list = document.getElementById("productList");

  if (!list) return;

  list.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${p.id} - ${p.title} - ${p.price.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}

      <button onclick="editProduct(${p.id})">Editar</button>
      <button onclick="deleteProduct(${p.id})">Eliminar</button>
    `;

    list.appendChild(li);
  });
});

function editProduct(id) {
  const product = productsList.find((p) => p.id === id);

  const form = document.getElementById("productForm");

  form.elements["id"].value = product.id;
  form.elements["title"].value = product.title;
  form.elements["description"].value = product.description;
  form.elements["code"].value = product.code;
  form.elements["price"].value = product.price;
  form.elements["stock"].value = product.stock;
  form.elements["category"].value = product.category;

  document.getElementById("formTitle").innerText = "Editar Producto";
  document.getElementById("submitBtn").innerText = "Actualizar";
}

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}
