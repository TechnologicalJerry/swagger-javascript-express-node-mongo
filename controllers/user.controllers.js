const UserModel = require('../models/user.model')

exports.createUser = async (req, res) => {
   if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.password && !req.body.phone) {
      res.status(400).send({ message: "Content can not be empty!" });
   }
   const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
   });

   await user.save().then(data => {
      res.send({
         message: "User created successfully!!",
         user: data
      });
   }).catch(err => {
      res.status(500).send({
         message: err.message || "Some error occurred while creating user"
      });
   });
};

exports.findAll = async (req, res) => {
   try {
      const user = await UserModel.find();
      res.status(200).json(user);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};

exports.findOne = async (req, res) => {
   try {
      const data = await Model.findById(req.params.id);
      res.json(data)
   }
   catch (error) {
      res.status(500).json({ message: error.message })
   }
}

exports.updateById = async (req, res) => {
   try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(
         id, updatedData, options
      )

      res.send(result)
   }
   catch (error) {
      res.status(500).json({ message: error.message })
   }
}

exports.delete = async (req, res) => {
   try {
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id)
      res.send(`Document with ${data.name} has been deleted..`)
   }
   catch (error) {
      res.status(400).json({ message: error.message })
   }
}