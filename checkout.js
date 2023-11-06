document.querySelector(".nav").addEventListener("click", (e) => {
  let count = 1;
  console.log(e.target);
  //*  delete tuşuna basıldığında ürünleri sıfırlama
  if (
    e.target.className == "nav__list--btn" ||
    e.target.classList.contains("fa-trash-can")
  ) {
    document.querySelector(".main__product-painel").remove();
    const par = document.createElement("p");
    const parText = document.createTextNode("No Products!");
    par.appendChild(parText);
    document.querySelector(".main__products-preview").appendChild(par);
    par.style.backgroundColor = "#FFF";

    //!selected products
    document.querySelector(".main__sum-price").textContent = "0.00 $";
    document
      .querySelectorAll(".main__summary--info .dollar")
      .forEach((item) => (item.textContent = "0.00$"));
  }
});

let calculatePrices = () => {
  const sumPrice = document.querySelector(".main__sum-price");
  sumPrice.textContent = [
    ...document.querySelectorAll(".main__product-line-price"),
  ]
    .reduce((acc, int) => acc + Number(int.textContent), 0)
    .toFixed(2);

  const taxPrice = (sumPrice.textContent * 0.18).toFixed(2);
  document.querySelector("div#cart-tax .dollar").textContent = taxPrice;
  console.log(taxPrice);

  const shippingPrice = sumPrice.textContent > 3000 ? "0.00" : "25.99";
  document.querySelector("div#cart-shipping .dollar").textContent = shippingPrice;

  const totalPrice= (+(sumPrice.textContent) +  +(taxPrice)+ +(shippingPrice)).toFixed(2)
  document.querySelector("div#cart-total ")
  console.log(totalPrice)

  return sumPrice.textContent;
};
console.log(document.querySelector("div#cart-tax .dollar").textContent);
calculatePrices()

//todo:   MAIN PART

document
  .querySelector(".main__products-preview")
  .addEventListener("click", (e) => {
    //* +,-, silme tuşlarına basıldığında
    if (e.target.classList.contains("fa-plus")) {
      e.target.previousElementSibling.textContent++;

      e.target.parentNode.parentNode.parentNode.lastElementChild.textContent = (
        e.target.previousElementSibling.textContent *
        e.target
          .closest(".main__product-info")
          .querySelector(".main__product-price--text .dollar").textContent
      ).toFixed(2);
      calculatePrices();
    } else if (e.target.classList.contains("fa-minus")) {
      if (e.target.nextElementSibling.textContent >= 1) {
        e.target.nextElementSibling.textContent--;
        e.target.parentNode.parentNode.parentNode.lastElementChild.textContent =
          (
            e.target.nextElementSibling.textContent *
            e.target
              .closest(".main__product-info")
              .querySelector(".main__product-price--text .dollar").textContent
          ).toFixed(2);
        calculatePrices();
      }
      if (e.target.nextElementSibling.textContent < 1) {
        let result = confirm(
          `${
            e.target
              .closest(".main__product-info")
              .querySelector(".main__product-info--title").textContent
          } will be removed!`
        );
        result
          ? e.target.closest(".main__product").remove()
          : (e.target.nextElementSibling.textContent = 1);
      }
    }
    //* silme tuşuna basıldığında
    else if (e.target.classList.contains("fa-trash-can")) {
      let result = confirm(
        `${
          e.target
            .closest(".main__product-info")
            .querySelector(".main__product-info--title").textContent
        } will be removed!`
      );
      result ? e.target.closest(".main__product").remove() : null;
      calculatePrices();
    }
  });
