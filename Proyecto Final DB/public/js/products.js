const socket = io();

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}

function modifyProduct(id) {
  let title = document.getElementById("getTitleModify");
  let description = document.getElementById("getDescriptionModify");
  let price = document.getElementById("getPriceModify");
  let code = document.getElementById("getCodeModify");
  if (
    !(
      title.value === "" ||
      description.value === "" ||
      price.value === "" ||
      isNaN(code.value)
    )
  ) {
    const product = {
      title: title.value,
      description: description.value,
      price: price.value,
      code: Number(code.value),
    };
    title.value = "";
    description.value = "";
    price.value = "";
    code.value = "";
    socket.emit("modifyProduct", product, id);
  } else {
    window.confirm("Todos los campos se deben llenar correctamente (Codigo es un numero)");
  }
}

function addProduct() {
  let title = document.getElementById("getTitle");
  let description = document.getElementById("getDescription");
  let price = document.getElementById("getPrice");
  let code = document.getElementById("getCode");
  if (
    !(
      title.value === "" ||
      description.value === "" ||
      price.value === "" ||
      isNaN(code.value)
    )
  ) {
    const product = {
      title: title.value,
      description: description.value,
      price: price.value,
      code: code.value,
    };
    title.value = "";
    description.value = "";
    price.value = "";
    code.value = "";
    socket.emit("addProduct", product);
  } else {
    window.confirm("Todos los campos se deben llenar correctamente (Codigo es un numero)");
  }
}

socket.on("update", (products) => {
  isCreated = document.getElementById("deletePls");
  if (isCreated) isCreated.remove();
  const tableBodyNode = document.createElement("tbody");
  tableBodyNode.setAttribute("id", "deletePls");
  tableNode.append(tableBodyNode);
  for (const product of products) {
    const tableBodyTrNode = document.createElement("tr");

    const rowElementId = document.createElement("td");
    const rowElementName = document.createElement("td");
    const rowElemenDescription = document.createElement("td");
    const rowElemenCategory = document.createElement("td");
    const rowElementPrice = document.createElement("td");
    const rowElementCode = document.createElement("td");
    const rowElementAction = document.createElement("td");

    const rowElementActionEdit = document.createElement("button");
    const rowElementActionDelete = document.createElement("button");
    const rowElementActionEditIcon = document.createElement("i");
    const rowElementActionDeleteIcon = document.createElement("i");
    rowElementActionEdit.setAttribute("type", "button");
    rowElementActionDelete.setAttribute("type", "button");
    rowElementActionEdit.setAttribute("class", "btn btn-primary m-1");
    rowElementActionDelete.setAttribute("class", "btn btn-danger m-1");
    rowElementActionEditIcon.setAttribute("class", "bi-pencil-square");
    rowElementActionDeleteIcon.setAttribute("class", "bi-trash");
    rowElementActionEdit.setAttribute(
      "onclick",
      `modifyProduct('${product.id}')`
    );
    rowElementActionDelete.setAttribute(
      "onclick",
      `deleteProduct('${product.id}')`
    );

    rowElementId.innerText = product.id;
    rowElementName.innerText = product.title;
    rowElemenDescription.innerText = product.description;
    rowElemenCategory.innerText = product.category;
    rowElementPrice.innerText = product.price;
    rowElementCode.innerText = product.code;

    rowElementAction.append(rowElementActionEdit);
    rowElementAction.append(rowElementActionDelete);
    rowElementActionEdit.append(rowElementActionEditIcon);
    rowElementActionDelete.append(rowElementActionDeleteIcon);

    tableBodyTrNode.append(rowElementId);
    tableBodyTrNode.append(rowElementName);
    tableBodyTrNode.append(rowElemenDescription);
    tableBodyTrNode.append(rowElemenCategory);
    tableBodyTrNode.append(rowElementPrice);
    tableBodyTrNode.append(rowElementCode);
    tableBodyTrNode.append(rowElementAction);
    tableBodyNode.append(tableBodyTrNode);
  }
})

socket.on("codeExists", (code) => {
  window.confirm("El codigo (" + code + ") ya existe en la base de datos")
})

const headerText = [
  "ID",
  "Titulo",
  "Descripcion",
  "Categoria",
  "Precio",
  "Codigo",
  "Accion",
]

const tableNode = document.createElement("table")
const tableHeadNode = document.createElement("thead")
const tableHeadTrNode = document.createElement("tr")
tableNode.append(tableHeadNode)
tableHeadNode.append(tableHeadTrNode)
tableNode.setAttribute("class", "table table-bordered")
body = document.getElementById("productTable")
body.append(tableNode)

for (const header of headerText) {
  const headerElement = document.createElement("th");
  headerElement.setAttribute("scope", "col");
  headerElement.innerText = header;
  tableHeadTrNode.append(headerElement);
}
