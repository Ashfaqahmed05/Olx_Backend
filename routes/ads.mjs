import express from 'express';
import Ads from "../models/Ads.mjs";
import verifyToken from '../middlewares/verifyTokens.mjs';

const router = express.Router();

// Get all products api

router.get('/', async (req, res) => {
    const ads = await Ads.find()
    res.send({ message: 'Ads fetched successfully', data: ads })
})

// Get specific product api

router.get('/:id', async (req, res)=>{
    try {
        const ID = req.params.id 
        const ads = await Ads.findById(ID)
        res.send({message: 'single ad fetched', data: ads})
        
    } catch (e) {
        res.send({message: e.message})
    }
})
//  Add product Api

router.post('/add',verifyToken, async(req, res) => {
    try {
        const ad = new Ads(req.body);
        await ad.save();
        res.send({ message: 'Ad is added' });
    }catch (e) {
        console.error('Error in saving ad:', e.message);
    }
});

//  Update product Api

router.put('/:id', async(req, res)=> {
    try {
        const Id = req.params.id
        const updatedAd = await Ads.updateOne({ _id: Id }, req.body);
        res.send({ message: 'Ad updated successfully', data: updatedAd });
    } catch (e) {
        console.log(e.message);
    }
});

// Delete product api

router.delete('/:id', async(req, res)=>{
    try {
        const Id = req.params.id
        const deleteAd = await Ads.deleteOne({_id: Id})


    } catch (e) {
        console.log(e.message)
    }

})






export default router;


// fetch('http://localhost:3004/ads/add',{
//      method:"POST",
// headers:{
//     'Content-Type': "application/json"
// },
// body: JSON.stringify({
//     title: "Iphone",
//     description: "Anything",
//     amount: 3000
// })
// }) 