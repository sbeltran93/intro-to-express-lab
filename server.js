const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


const express = require('express')

const app = express()


app.get('/', (req, res) =>  {
    res.send('Hello, welcome')
})      
// ---------------------------------------------------


app.get('/greetings/:username', (req, res) => {
    res.send(`Hello and welcome ${req.params.username}!`)
})

// -----------------------------------------------------

app.get('/roll/:number', (req, res) => {
    const number = req.params.number

if(isNaN(number)) {
    res.send(`You must specify a number in order to roll dice`)
}
else {
    const maxNumber = parseInt(number);

const roll = Math.floor(Math.random() * (maxNumber + 1))
res.send(`You rolled ${roll}.`)    
}})
// -------------------------------------------------

  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index)

    if (index >= 0 && index < collectibles.length) {
    const collectible = collectibles[index]
    const response = `So you want ${collectible.name}? for ${collectible.price}, it can be yours!`
    res.send(response)
  } else {
      res.send(`This item is not in stock, check back soon!`)
    }
  })
  
// --------------------------------------

  app.get('/shoes', (req, res) => {
    const {'min-price': minPrice, 'max-price': maxPrice, type} = req.query

    let filteredShoes = shoes;
    if (minPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseInt(minPrice, 10))
    }
    if (maxPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseInt(maxPrice,10))
    }
    if(type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type)
    }
    res.json(filteredShoes)
  })

  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })

  // collaborated w/ Jonathan, Travis && Anitra on this lab