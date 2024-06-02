export async function fetchProducts() {
    try {
      // db.json dosyasına fetch ile istek attık
      const response = await fetch("db.json");
  
      if (!response.ok) {
        // Hata oluşturduk
        throw new Error("URL yanlış");
      }
      // Gelen cevabı json formatına çevirdik ve dışarıya return ettik
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  //* Ürünlerin sayfaya render eden fonksiyonu tanımlıyoruz
  export function renderProducts(products, addToCartCallback) {
    //* HTML dosyasından ürünlerin listeleneceği elementi seçeriz.
    const productList = document.getElementById("productList");
  
    //* Ürünlerin HTML formatında listeye eklenmesi için products dizisini dönüp her bir product için ekrana product cartını aktardık
    productList.innerHTML = products
      .map(
        (product) => `
      <div class="product">
          <img
              src="${product.image}"
              alt=""
              class="product-img"
          />
          <div class="product-info">
              <h2 class="product-title">${product.title}</h2>
              <p class="product-price">$${product.price}</p>
              <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
          </div>
      </div>
    
    `
      )
      .join("");
  
    //* "Add to cart" butonları seçiliyor
    const addToCartButtons = document.getElementsByClassName("add-to-cart");
    //* Her bir "Add to cart" butonuna tıklama olayı ekleniyor.
    for (let i = 0; i < addToCartButtons.length; i++) {
      const addToCartButton = addToCartButtons[i];
      addToCartButton.addEventListener("click", addToCartCallback);
    }
  }