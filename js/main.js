const productsList = document.querySelector('[data-products-list]');

const createProductCard = ({ title, price, image }) => {
  const item = document.createElement('li');
  item.className = 'grid__item';

  const card = document.createElement('article');
  card.className = 'grid__card';

  const productImage = document.createElement('img');
  productImage.className = 'grid__image';
  productImage.src = image;
  productImage.alt = title;

  const name = document.createElement('h2');
  name.className = 'grid__name';
  name.textContent = title;

  const productPrice = document.createElement('p');
  productPrice.className = 'grid__price';
  productPrice.textContent = `$${price}`;

  const button = document.createElement('button');
  button.className = 'grid__button';
  button.type = 'button';
  button.textContent = 'Детальніше';

  card.append(productImage, name, productPrice, button);
  item.append(card);

  return item;
};

const fetchProducts = async () => {
  if (!productsList) {
    return;
  }

  try {
    const response = await fetch('https://fakestoreapi.com/products/');

    if (!response.ok) {
      throw new Error(`Products request failed: ${response.status}`);
    }

    const products = await response.json();

    productsList.replaceChildren(...products.map(createProductCard));
  } catch (error) {
    console.error(error);
  }
};

fetchProducts();
