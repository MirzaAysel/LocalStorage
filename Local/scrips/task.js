const btns = document.querySelectorAll(".btn-add");
//console.log(btns)

btns.forEach(function (item) {
  item.addEventListener("click", function () {
    //console.log("isleyir")

    const cardImg = item.parentElement.parentElement.children[0].src;
    //console.log(cardImg)
    const cardTitle =
      item.parentElement.parentElement.children[1].children[0].textContent;
    //console.log(cardTitle)

    const cardPrice =
      item.parentElement.parentElement.children[2].children[0].textContent;
    //console.log(cardPrice)

    const cardId = item.parentElement.parentElement.dataset.id;

    const cardData = {
      cardTitle,
      cardImg,
      cardPrice,
      id: cardId,
      quantity: 1,
    };
    //console.log(cardData)
    addToCart(cardData);
  });
});

function addToCart(data) {
  //  console.log(data)
  let cart = JSON.parse(localStorage.getItem("newData")) || [];

  if (cart.length === 0) {
    cart.push(data);
    localStorage.setItem("newData", JSON.stringify(cart));
  } else {
    let cartItem = cart.find((card) => {
      return data.id == card.id;
    });
    if (cartItem === undefined) {
      cartItem = data;
    } else {
      cartItem.quantity = cartItem.quantity + 1;
      cartItem.cardPrice =
        "$" + cartItem.quantity * +cartItem.cardPrice.split("$")[1];
    }
    const newCart = cart.filter((card) => card.id != data.id);
    newCart.push(cartItem);
    localStorage.setItem("newData", JSON.stringify(newCart));
  }
}
