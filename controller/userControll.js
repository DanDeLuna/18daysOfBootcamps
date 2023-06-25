const { Usuario, Thought } = require("../models");
module.exports = {
    getUsuario(req, res) {
        Usuario.find({})
        .then((usuario) => res.json(usuario))
        .catch((err) => res.status(500).json(err));
    },
  
    getSingleUsuario(req, res) {
        Usuario.findOne({ _id: req.params.usuarioId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
        .then((usuario) =>
          !usuario
            ? res.status(404).json({ message: "No Usuario found with that ID!" })
            : res.json(usuario)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    createUsuario(req, res) {
        Usuario.create(req.body)
        .then((usuario) => res.json(usuario))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
  
    updateUsuario(req, res) {
        Usuario.findOneAndUpdate(
        { _id: req.params.usuarioId },
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
        Usuario.findOneAndDelete({ _id: req.params.usuarioId })
        .then((usuario) =>
          !usuario
            ? res.status(404).json({ message: "No Usuario  with this ID!" })
            : Thought.deleteMany({ _id: { $in: usuario.thoughts } })
        )
        .then(() => res.json({ message: "Usuario and Thoughts deleted!" }))
        .catch((err) => res.status(500).json(err));
    },
  
    addAmigo(req, res) {
        Usuario.findOneAndUpdate(
        { _id: req.params.usuarioId },
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
  
    deleteFriend(req, res) {
     Usuario.findOneAndUpdate(
        { _id: req.params.usuarioId },
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