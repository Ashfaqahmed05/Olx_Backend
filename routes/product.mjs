import express from 'express'

const Router = express.Router()

const data = [{ "id": 1, "title": "iPhone 9", "description": "An apple mobile which is nothing like apple", "price": 549, "discountPercentage": 12.96, "rating": 4.69, "stock": 94, "brand": "Apple", "category": "smartphones", "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg", "images": ["https://cdn.dummyjson.com/product-images/1/1.jpg", "https://cdn.dummyjson.com/product-images/1/2.jpg", "https://cdn.dummyjson.com/product-images/1/3.jpg", "https://cdn.dummyjson.com/product-images/1/4.jpg", "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"] }]

Router.get('/' , (req, res)=>{

    res.send({message: 'product fetched' , data})
})

// product/:id

Router.get('/:id' , (req, res)=>{
    console.log(req.params.id)
    res.send({message: 'single product fetched' , data})
})


// products/add

Router.post("/add", (req, res)=>{
    console.log(req.body)

    res.send({message: "product added successfully"})
})



// products/:id

Router.delete("/:id", (req, res)=>{
    console.log(req.params.id)

    res.send({message: "product added successfully"})
})



export default Router