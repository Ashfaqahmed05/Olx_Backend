import express from 'express'
import Products from "./product.mjs"
import User from "./user.mjs"
import Ads from "./ads.mjs"


const Router = express.Router()

Router.use("/product", Products);

Router.use('/user', User);

Router.use("/ads", Ads);


export default Router;