const router = require('express').Router();

const {
    getThought,
    getOneThought,
    makeThought,
    updateThought,
    deleteThought,
    createReact,
    deleteReact
} = require('../../controller/thoughtControll');

// /api/thoughts
router.route('/').get(getThought).post(makeThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(createReact);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReact);


module.exports = router;