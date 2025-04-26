import jwt from "jsonwebtoken"
import logger from "../utils/logger.js"

const Auth = (req, res, next) => {
    const authHeader = req.head("Authorization")
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if(!token){
        logger.warn(`No auth middlewares provided`)
        return res.status(401).json({message: 'Authorization denied, no token provided'})
    } try {
        const decoded = jwt.decode(token,process.env.JTW_SECRET)
        req.user = decoded.user
        logger.debug(`Authorization approved for ${res.user.id}`)
        next()
    } catch (error) {
        logger.error('Auth iddleware: token verification failed', err)
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "Token is expired" })
        }
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: "Token is not valid" })
        }
        return res.status(error.status || 500).json({ message: error.message || "server error during token verification" })
    }
}

export default Auth