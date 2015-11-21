var User = require('../models/User.js')

//index shows all the users
  function index(req, res) {
    User.find({},function(err, users){
      if(err) throw err
      res.json(uses)
    })
  }

//need to create action to create a new user
  function show(req, res) {
    User.find({email: req.params.email},function(err,user){
      if(err) throw err
      res.json(user)
    })
  }

//need to create action to show a single user
  function create(req, res){
    console.log('Creating a user')
    var user = new User()

    user.user_name = req.body.username
    user.email = req.body.email
    user.save(function(err){
      if(err){
        if(err.code == 11000){
          return res.json({sucess:false, message:'dude, WTF, this email already exists!?'})
        } else {
                res.send(err)
        }
      }
      res.json({success: true, message: 'User created successfully!!!!!!'})
    })
    }

  function update(req, res){

    }

  function destroy(req,res){

    }

module.exports = {
  indexUser: index,
  addUser: create,
  showUser: show,
  updateUser: update,
  destroyUser: destroy
}
