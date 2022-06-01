const getDataFromStorage = () => {
  const cart = JSON.parse(localStorage.getItem("newData"));

  if (cart !== null) {
    cart.forEach(({ id, cardTitle, cardPrice, cardImg, quantity }, index) => {
      const tempStr = `
    <tr class="card-data-${index}" data-id="${id}">
                <th>1</th>
                <th style="width: 10%">
                  <img
                    class="img-fluid"
                    src="${cardImg}"
                    alt=""
                  />
                </th>
                <td>${cardTitle}</td>
                <td>${cardPrice}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <button class="btn btn-primary plus mx-3">+</button>
                    <span class="quantity-${index}">${quantity}</span>
                    <button class="btn btn-primary minus mx-3">-</button>
                  </div>
                </td>
                <td>
                  <button class="btn btn-danger remove-btn">Delete</button>
                </td>
              </tr>
    
    `;
      document.querySelector("tbody").innerHTML += tempStr;
    });
  }
};

const incrementQuantity = (dataId, index) => {
  const cart = JSON.parse(localStorage.getItem("newData"));
  const newCart = cart.map((card) => {
    if (card.id == dataId) {
      card.quantity = card.quantity + 1;
    }
    return card;
  });

  localStorage.setItem("newData", JSON.stringify(newCart));
  document.querySelector(`.quantity-${index}`).textContent = newCart.find(
    (card) => card.id == dataId,
  ).quantity;
};

const decrementQuantity = (dataId, index) => {
  const cart = JSON.parse(localStorage.getItem("newData"));
  let newCart = cart.map((card) => {
    if (card.id == dataId) {
      if (+card.quantity > 0) {
        card.quantity = card.quantity - 1;

        document.querySelector(`.quantity-${index}`).textContent =
          card.quantity;
      } else {
        card.quantity = 0;
        document.querySelector(`.quantity-${index}`).textContent =
          card.quantity;
      }
    }
    return card;
  });

  newCart.forEach((card) => {
    if (card.quantity == "0") {
      document.querySelector(`.card-data-${index}`).remove();
    }
  });
  newCart = newCart.filter((card) => card.quantity != "0");
  localStorage.setItem("newData", JSON.stringify(newCart));
};

window.addEventListener("load", () => {
  getDataFromStorage();
  document.querySelectorAll(".plus").forEach((btn, index) => {
    console.log(btn.parentElement.parentElement.parentElement);
    btn.addEventListener("click", () => {
      incrementQuantity(
        btn.parentElement.parentElement.parentElement.dataset.id,
        index,
      );
    });
  });

  document.querySelectorAll(".minus").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      decrementQuantity(
        btn.parentElement.parentElement.parentElement.dataset.id,
        index,
      );
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const data = JSON.parse(localStorage.getItem("newData"));
      const newData = data.filter(
        (card) =>
          card.id != btn.parentElement.parentElement.parentElement.dataset.id,
      );
      localStorage.setItem("newData", JSON.stringify(newData));
      btn.parentElement.parentElement.remove();
    });
  });
});
