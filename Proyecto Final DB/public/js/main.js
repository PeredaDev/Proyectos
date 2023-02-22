const socket = io()

function deleteProduct(id){
    socket.emit('deleteProduct', id)
}

function modifyProduct(id){
    let title = document.getElementById("getTitleModify").value;
    let description = document.getElementById("getDescriptionModify").value;
    let price = document.getElementById("getPriceModify").value;
    let code = document.getElementById("getCodeModify").value;
    const product = {
        title: title,
        description: description,
        price: price,
        code: code
    }
    socket.emit('modifyProduct', product, id)
}

function addProduct(){
    let title = document.getElementById("getTitle").value;
    let description = document.getElementById("getDescription").value;
    let price = document.getElementById("getPrice").value;
    let code = document.getElementById("getCode").value;
    const product = {
        title: title,
        description: description,
        price: price,
        code: code
    }
    socket.emit('addProduct', product)
}

socket.on('initialize' , products => {   
    isCreated = document.getElementById("deletePls");
    if (isCreated)
        isCreated.remove()
    const tableBodyNode = document.createElement('tbody')
    tableBodyNode.setAttribute('id', 'deletePls')
    tableNode.append(tableBodyNode)
    for (const product of products) {
        const tableBodyTrNode = document.createElement('tr')

        const rowElementId = document.createElement('td')
        const rowElementName = document.createElement('td')
        const rowElemenDescription = document.createElement('td')
        const rowElementPrice = document.createElement('td')
        const rowElementCode = document.createElement('td')
        const rowElementAction = document.createElement('td')

        const rowElementActionEdit = document.createElement('button')
        const rowElementActionDelete = document.createElement('button')
        const rowElementActionEditIcon = document.createElement('i')
        const rowElementActionDeleteIcon = document.createElement('i')
        rowElementActionEdit.setAttribute('type', 'button')
        rowElementActionDelete.setAttribute('type', 'button')
        rowElementActionEdit.setAttribute('class', 'btn btn-primary m-1')
        rowElementActionDelete.setAttribute('class', 'btn btn-danger m-1')
        rowElementActionEditIcon.setAttribute('class', 'bi-pencil-square')
        rowElementActionDeleteIcon.setAttribute('class', 'bi-trash')
        rowElementActionEdit.setAttribute('onclick', `modifyProduct(${product.id})`)
        rowElementActionDelete.setAttribute('onclick', `deleteProduct(${product.id})`)

        rowElementId.innerText = product.id
        rowElementName.innerText = product.title
        rowElemenDescription.innerText = product.description
        rowElementPrice.innerText = product.price
        rowElementCode.innerText = product.code

        rowElementAction.append(rowElementActionEdit)
        rowElementAction.append(rowElementActionDelete)
        rowElementActionEdit.append(rowElementActionEditIcon)
        rowElementActionDelete.append(rowElementActionDeleteIcon) 
        
        tableBodyTrNode.append(rowElementId)
        tableBodyTrNode.append(rowElementName)
        tableBodyTrNode.append(rowElemenDescription)
        tableBodyTrNode.append(rowElementPrice)
        tableBodyTrNode.append(rowElementCode)
        tableBodyTrNode.append(rowElementAction)
        tableBodyNode.append(tableBodyTrNode)
    }
})

const headerText = ['ID', 'Titulo', 'Descripcion', 'Precio', 'Codigo', 'Accion']
const tableNode = document.createElement('table')
const tableHeadNode = document.createElement('thead')
const tableHeadTrNode = document.createElement('tr')
tableNode.append(tableHeadNode)
tableHeadNode.append(tableHeadTrNode)
tableNode.setAttribute('class', 'table table-bordered')
body = document.getElementById("productTable");
body.append(tableNode)

for (const header of headerText) {
    const headerElement = document.createElement('th')
    headerElement.setAttribute('scope', 'col')
    headerElement.innerText = header
    tableHeadTrNode.append(headerElement)
}

