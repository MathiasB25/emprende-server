import User from "../models/User.js"
import createToken from "../helpers/createToken.js"
import createJWT from '../helpers/createJWT.js'

const register = async (req, res) => {
    const { email, name, password } = req.body

    const emailExist = await User.findOne({email})
    
    if(emailExist) {
        const error = new Error('Email already exists')
        return res.status(400).json({ msg: error.message, success: false })
    }

    try {
        if(!email || !name || !password) {
            res.json({ msg: 'Some fields are missing', success: false })
            return
        }
        const user = new User(req.body)
        user.role = 'client';
        /* user.token = createToken() */
        await user.save()
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body

    if(!password) {
        return res.status(404).json({ msg: '"password" is required', success: false })
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('User not exists')
        return res.status(404).json({ msg: error.message, success: false })
    }
    // Check if user is confiremd
    if(!user.confirmed) {
        const error = new Error('Account not confirmed')
        return res.status(400).json({ msg: error.message, success: false })
    }
    /* Check if user account is disabled */
    if(user.disabled) {
        const error = new Error('Disabled account')
        return res.status(403).json({ msg: error.message, success: false })
    }

    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: createJWT(user._id),
            wallet: user.wallet
        })
    } else {
        const error = new Error('Wrong password')
        return res.status(403).json({ msg: error.message, success: false })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({token})
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message, success: false })
    }

    try {
        user.confirmed = true
        user.token = ''
        await user.save()
        res.json({ success: true })
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('Invalid email')
        return res.status(404).json({ msg: error.message, success: false })
    }

    try {
        user.token = createToken()
        await user.save()
        /* TODO: Importar nodemailer al proyecto y enviar email cuando el usuario resetee su password */
        res.json({ success: true })
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message, success: false })
    }
    res.json({ success: true })
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message, success: false })
    }

    user.password = password
    user.token = ''
    try {
        await user.save()
        res.json({ success: true })
    } catch (error) {
        console.log(error)
    }
}

const profile = async (req, res) => {
    const { user } = req

    res.json(user)
}

const editProfile = async (req, res) => {
    const { name, email, password, userId } = req.body

    if (String(userId).match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findOne({ userId })
        if(!user) {
            return
        }

        if (String(name).length < 20) {
            try {
                user.name = name
                user.email = email
                user.password = password
                await user.save()
                res.json(user)
            } catch (error) {
                res.json({ success: false })
            }

        }
    }
}

const disable = async (req, res) => {
    const { _id } = req.body

    if(String(_id).match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findOne({ _id })
        if(user) {
            user.disabled = true
            try {
                await user.save()
                res.json({ success: true })
            } catch (error) {
                console.log(error)
                res.json({ success: false })   
            }
        }
    }
}

export {
    register,
    authenticate,
    confirm,
    resetPassword,
    checkToken,
    newPassword,
    profile,
    editProfile,
    disable
}
