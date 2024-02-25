import jwt from 'jsonwebtoken'

// Verify if user is autenticated
export const verifyUser = (req, res, next) => {
  const auth = req.get('authorization')
  const token = (auth.split(' '))[1]

  if (!token) {
    res.send({ message: 'Usuario no autenticado' })
  } else {
    const TOKEN_KEY = process.env.SECRET
    jwt.verify(token, TOKEN_KEY, (error, decode) => {
      if (error) {
        return res.send({ error })
      } else {
        req.user = decode.user
        next()
      }
    })
  }
}