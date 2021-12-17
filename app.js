const alphaPos = new AlphaPos()
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
const orderLists = document.querySelector('[data-order-lists]')
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')

addDrinkButton.addEventListener('click', function () {
  // 1. Get checked value of options
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')
  console.log(`${drinkName}, ${ice}, ${sugar}`)

  // 2. Show alert if user did not check any drink option
  if (!drinkName) {
    window.alert('Please choose at least one item.')
    return
  }

  // 3. User Drink Constructor to create drink instance
  const drink = new Drink(drinkName, ice, sugar)

  // 4. add order UI
  alphaPos.addDrink(drink)
})

orderLists.addEventListener('click', function (event) {
  const isDeletedButton = event.target.matches('[data-alpha-pos="delete-drink"]')

  if (!isDeletedButton) {
    return
  }

  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

checkoutButton.addEventListener('click', function () {
  // 1. Calculate total amount
  window.alert(`Total amount of drinks: $${alphaPos.checkout()}`)

  // 2. Reset the order list
  alphaPos.clearOrder(orderLists)
})

// Constructor function for Alpha Pos System
function AlphaPos () { }

AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  const allOptions = document.querySelectorAll(`input[name="${inputName}"]`)

  allOptions.forEach(function (option) {
    if (option.checked) {
      selectedOption = option.value
    }
  })
  return selectedOption
}

AlphaPos.prototype.addDrink = function (drink) {
  const orderListsCard = `
    <div class="card mb-3">
      <div class="card-body pt-3 pr-3">
        <div class="text-right">
          <span data-alpha-pos="delete-drink">×</span>
        </div>
        <h6 class="card-title mb-1">${drink.name}</h6>
        <p class="card-text">${drink.ice}</p>
        <p class="card-text">${drink.sugar}</p>
      </div>
      <div class="card-footer text-right py-2">
        <div class="cart-text text-muted">
          $ <span data-drink-price>${drink.price()}</span>
        </div>
      </div>
    </div>
  `

  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  const drinkPrices = document.querySelectorAll('[data-drink-price]')

  drinkPrices.forEach(function (price) {
    totalAmount += Number(price.textContent)
  })

  return totalAmount
}

AlphaPos.prototype.clearOrder = function (target) {
  const cards = target.querySelectorAll('.card')

  cards.forEach(function (card) {
    card.remove()
  })
}

// Constructor function for Drink
function Drink (name, sugar, ice) {
  this.name = name
  this.ice = ice
  this.sugar = sugar
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      window.alert('No this drink')
  }
}
