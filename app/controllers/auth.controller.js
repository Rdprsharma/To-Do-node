const mongoose = require('mongoose');
const config = require("../config/auth.config");
const User = require("../models/user.model");
const Todo = require("../models/todo.model");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async(req, res) => {
  const user = new User({
    username:req.body.username,
    mobile:req.body.mobile,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  await user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
          res.send({ message: "User was registered successfully!"});
    }
  });
};

exports.signin = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  });
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });
      user.token = token;
      await user.save();
      res.status(200).send({
        id: user._id,
        username: user.username,
        mobile: user.mobile,
        accessToken: token
      });
};

exports.getTodos=async(req, res)=> {
  try {
      const todos = await Todo.find(); 
      res.json(todos);
  } catch (error) { res.status(500).json({ message: "Error fetching to-do items", error: error.message }); }
}

  exports.createTodo=async(req, res)=> {
  // const errors = validationResult(req); 
  // if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
  const { name, description, completed } = req.body;
  try {
      const newTodo = new Todo({
          name, description, completed,  
      });
      const savedTodo = await newTodo.save(); 
      res.status(201).json(savedTodo);
  } catch (error) { res.status(500).json({ message: "Error creating to-do item", error: error.message }); }
}
  exports.updateTodo=async(req, res)=> {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  try {
      const updatedTodo = await Todo.findByIdAndUpdate(id, { name, description, completed }, { new: true, runValidators: true } 
      );
      if (!updatedTodo) {
          return res.status(404).json({ message: "To-do item not found" });
      } res.json(updatedTodo);
  } catch (error) { res.status(500).json({ message: "Error updating to-do item", error: error.message }); }
}
  exports.deleteTodo=async(req, res)=> {
  const { id } = req.params; try {
      const deletedTodo = await Todo.findByIdAndDelete(id);
      if (!deletedTodo) {
          return res.status(404).json({ message: "To-do item not found" });
      } res.json({ message: "To-do item deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting to-do item", error: error.message });
  }
}

exports.getTodoById = async (req, res) => { 
  const { id } = req.params; 
  try { 
    const todo = await Todo.findById(id); 
    if (!todo) { 
      return res.status(404).json({ message: "To-do item not found" }); 
    } 
    res.json(todo); 
  } catch (error) { 
    res.status(500).json({ message: "Error fetching to-do item", error: error.message }); 
  } 
};
