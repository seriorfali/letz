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
