const {User, Thought } = require("../models");
module.exports = {
  
    getUsuario(req, res) {
      User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
  
    getOneUsuario(req, res) {
      User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
    createUsuario(req, res) {
      User.create(req.body)
        .then((usuario) => res.json(usuario))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        })
    },
  
    updateUsuario(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((usuario) =>
          !usuario
            ? res.status(404).json({ message: "No Usuario with this ID!" })
            : res.json(usuario)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    deleteUsuario(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((usuario) =>
          !usuario
            ? res.status(404).json({ message: "No Usuario  with this ID!" })
            : Thought.deleteMany({ _id: { $in: usuario.thoughts } })
        )
        .then(() => res.json({ message: "Usuario and Thoughts deleted!" }))
        .catch((err) => res.status(500).json(err));
    },
  
    addAmigo(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { amigo: req.params.amigoId } },
        { runValidators: true, new: true }
      )
        .then((usuario) =>
          !usuario
            ? res.status(404).json({ message: "No Usuario  with this ID!" })
            : res.json(usuario)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    deleteAmigo(req, res) {
     User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { amigo: req.params.amigoId } },
        { new: true }
      )
        .then(
          (usuario) =>
            !usuario
              ? res.status(404).json({ message: "No Usuario  with this ID!" })
              : res.json(usuario)
        )
        .catch((err) => res.status(500).json(err));
    },
  };