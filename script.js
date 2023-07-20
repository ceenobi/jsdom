const heroPrice = document.querySelector('#heroPrice')
const heroImg = document.querySelector('#heroImg')
const heroCat = document.querySelector('#heroCat')
const topRated = document.querySelector('#topRatedContainer')
const productContainer = document.querySelector('#productContainer')
const categoryList = document.querySelector('#categoryList')
const categoryListLg = document.querySelector('#categoryListLg')
console.log('cc', categoryList)

const fetchAllProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()
  console.log('data', data)
  prices = data.map((product) => product.price)
  console.log('pp', prices)
  const maxPrice = Math.max(...prices)
  console.log(maxPrice)
  const getMaxPrice = data.filter((product) => product.price === maxPrice)
  console.log(getMaxPrice)
  heroPrice.textContent = getMaxPrice.map((product) =>
    product.title.slice(0, 20)
  )
  heroImg.src = getMaxPrice.map((product) => product.image)
  heroCat.textContent = getMaxPrice.map((product) => product.category)
  //   show top topRated
  const getTopRated = data.filter((product) => product.rating.rate > 4.65)
  console.log('getTRated', getTopRated)
  topRated.innerHTML = getTopRated
    .slice(0, 3)
    .map(
      (product) =>
        `<div class='col-md-4 bg-white p-4 rounded-4 shadow-lg card-size'>
      <p class='fw-bold fs-4 mb-1'>${product.title.slice(0, 20)}</p>
      <p class='fw-light fs-5 '>$${product.price}</p>
      <div class='imgResize'>
      <img src='${product.image}' alt='${product.title.slice(
          0,
          20
        )}' class='w-100 h-100'/>
      </div>
    </div>`
    )
    .join('')
  productContainer.innerHTML = data.map(
    (
      product
    ) => `<div class='col-md-4 col-lg-3 mb-2 bg-white p-4 rounded-4 shadow-lg card-size'>
      <p class='fw-bold fs-4 mb-1'>${product.title.slice(0, 20)}</p>
      <p class='fw-light fs-5 '>$${product.price}</p>
      <div class='imgResize'>
      <img src='${product.image}' alt='${product.title.slice(
      0,
      20
    )}' class='w-100 h-100'/>
      </div>
    </div>`
  )
}

fetchAllProducts()

async function fetchCategory() {
  const res = await fetch('https://fakestoreapi.com/products/categories')
  const data = await res.json()
  console.log(data)
  categoryList.innerHTML = data
    .map(
      (category) => `
  <a href="#" class="text-black fs-4 text-capitalize mb-2">${category}</a>`
    )
    .join('')
  categoryListLg.innerHTML = data
    .map(
      (category) => `
    <a href="#" class="text-black fs-5 text-capitalize mx-2">${category}</a>`
    )
    .join('')
}
fetchCategory()


function load() {
  document.querySelector('main').style.display = 'block'
  document.querySelector('#loading').style.display = 'none'
}

// const getProductsInCategory = async () => {
//   getCategoryName = categoryList.querySelectorAll('a')
//   console.log(getCategoryName)
// }

// getProductsInCategory()
