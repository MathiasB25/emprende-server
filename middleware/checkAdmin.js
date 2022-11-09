import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const checkAdmin = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await User.findById(decoded.id).select('-password -confirmed -token -createdAt -updatedAt -__v')
            if(!req.user) {
                const error = new Error('User not found')
                return res.status(401).json({ msg: error.message, success: false })
            }

            if(req.user.role && req.user.role !== 'admin') {
                return res.json({ msg: 'Insufficient permissions', success: false })
            }

            return next()
        } catch (error) {
            return res.status(404).json({ msg: 'There was a mistake', success: false })
        }
    }

    if (!token) {
        const error = new Error('Invalid JWT')
        return res.status(401).json({ msg: error.message, success: false })
    }

    next()
}

export default checkAdmin