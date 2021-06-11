const jwt = require("jsonwebtoken")
let secret = "TAS-TAS-TAS"

module.exports = {

  generateToken(req, res){
    let token = jwt.sign({}, secret, { expiresIn: 86400 })
    res.status(200).send({
      error: false,
      token
    })
  },

  tokenVerify(req, res, next){    
    let token = req.headers.authorization
    if (token == null) {
      res.status(401).send({
        error: true,
        message: "Missing Authorization"
      })
    }
    if (token.split(" ")[0] != "Bearer" || token.split(" ")[1] == null) {      
      res.status(401).send({
        error: true,
        message: "Token invalid"
      })
    }
    jwt.verify(token.split(" ")[1], secret, (err, val) => {
      if (err) {       
        res.status(401).send({
          error: true,
          message: err.message
        })
      } else next()
    })
  },
}
