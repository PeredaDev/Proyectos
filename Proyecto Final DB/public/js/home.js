const socket = io();

socket.on("update", (products) => {
  body = document.getElementById("products2sell");

  for (const product of products) {
    const tableCol = document.createElement("div");
    tableCol.setAttribute("class", "col-sm mb-3");
    
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("style", "width: 18rem;");
    tableCol.append(card)
    
    const img = document.createElement("img");
    img.setAttribute("src", "...");
    img.setAttribute("class", "card-img-top");
    card.append(img)
    
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    card.append(cardBody)
    
    
    const cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-img-top");
    cardTitle.innerText = product.title
    cardBody.append(cardTitle)
    
    const cardParagraph = document.createElement("p");
    cardParagraph.setAttribute("class", "card-text");
    cardParagraph.innerText = "Some quick example text to build on the card title and make up the bulk of the card's content"
    cardBody.append(cardParagraph)
    
    
    const cardBuy = document.createElement("a");
    cardBuy.setAttribute("class", "btn btn-primary");
    cardBuy.innerText = "Buy this"
    cardBody.append(cardBuy)
    body.append(tableCol);
    
  }
  
});