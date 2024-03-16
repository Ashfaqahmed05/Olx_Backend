import express from "express";
import Users from "../models/User.mjs";
import verifyToken from "../middlewares/verifyTokens.mjs";

const Router = express.Router()


Router.post("/register", async (req, res) =>{
    try {
        const existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.send({ message: 'Email already registered' });
        }
        const user = new Users(req.body);
        user.save();
        res.send({message: 'user registered'})
    } catch (e) {
        res.send({message: e.message})
    }
})




Router.get('/', async(req, res)=>{
    const users = await Users.find()
    res.send({message: 'user mil gya', data:users})

})

Router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        //Step 1: Check if email exists
        const user = await Users.findOne({ email })
    
        if (!user) {
            res.status(404).send({ message: 'Email not found!' })
            return
        }
    
        //Step 2: Compare Password
        const isCorrectPassword = user.comparePassword(password)
    
        if (!isCorrectPassword) {
            res.status(404).send({ message: 'Password is incorrect!' })
            return
        }
    
        // Step 3: Generate Token
        const token = user.generateToken()
        console.log("Token-------->",token)
        user.tokens.push(token)
        await user.save()
        
        res.send({ message: 'User logged in successfully!', token })
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

Router.put('/logout', verifyToken, async (req, res) => {
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})


export default Router



//  find() array return krta he OR findOne() onject return krta he