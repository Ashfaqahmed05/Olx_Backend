import  jwt  from "jsonwebtoken";
import user from "../models/User.mjs";
import jwtSecret from "../config/jwt.mjs";

async function verifyToken(req, res, next){
    const token = req.headers.authorization

    if (!token) {
        res.status(401).send({ message: "No access!" })
        return
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)

        const tokenExists = await user.findOne({ tokens: token })

        if (!tokenExists) {
            res.status(401).send({ message: "Invalid token!" })
            return
        }

        req.userId = decoded._id
        req.tokenToRemove = token

        next()
    } catch (e) {
        res.status(401).send({ message: "Invalid token!" })
    }


}

export default verifyToken