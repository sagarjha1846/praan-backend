import { Request } from "express"
import { userData } from "../models/User"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const login = async (req: Request, res: any) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: "Fields missing! Invalid Input!" })
      return
    }
    const userFound = await userData.findOne({ email: email })
    if (!userFound) {
      res.status(400).json({ message: "User Not Found" })
      return
    } else {
      let isPasswordValid = await bcrypt.compare(password, userFound.password)
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid credentails!" })
        return
      }
      const token = jwt.sign(
        {
          userId: userFound._id,
          userEmail: userFound.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login Successful", user: {
          email: userFound.email,
          name: userFound.name,
          token,
        }
      })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
    return
  }
}


const register = async (req: Request, res: any) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      res.status(400).json({ message: "Fields missing! Invalid Input!" })
      return
    }

    const userFound = await userData.findOne({ email: email })

    if (userFound) {
      res.status(400).json({ message: "User already exists!" })
      return
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userData.create({
      name, email, password: hashPassword
    })

    if (!user) {
      res.status(500).json({ message: "User not created!" })
      return
    }

    res.status(200).json({ message: "User Created!", user })


  } catch (error: any) {
    res.status(500).json({ message: error.message })
    return
  }

}


export { login, register }