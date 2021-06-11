const User = require("../model/userModel")

module.exports = {  

  find(){
    return User.find().exec()
  },
  
  findByAccountNumber(accountNumber){
    return User.find().where({
      accountNumber
    }).exec()
  },

  findByIdentityNumber(identityNumber){
    return User.find().where({
      identityNumber
    }).exec()
  },

  create(userName, accountNumber, emailAddress, identityNumber){
    let user = new User({
      userName,
      accountNumber,
      emailAddress,
      identityNumber
    })

    return user.save()
  },

  update(id, param) {
    return User.findByIdAndUpdate(id, param)
  },

  delete(id){
    return User.findByIdAndDelete(id)
  }

  
}