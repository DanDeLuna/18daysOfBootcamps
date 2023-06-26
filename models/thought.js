const { Schema, model, Types } = require('mongoose');

const moment = require('moment')

const reactSchema = new Schema (
  {
     reactId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
     },
     reactBody: {
      type: String,
      required: true,
      maxlength: 295
     },
     username: {
      type: String,
      required: true,
     },
     madeAt: {
      type: Date,
      default: Date.now,
      get: madeAtVal => moment(madeAtVal).format("MMM DD, YYYY [at] hh:mm a"),
     },},
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false,
  }
)

const thoughtsSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      madeAt: {
        type: Date,
        default: Date.now,
        get: madeAtVal => moment(madeAtVal).format("MMM DD, YYYY [at] hh:mm a"),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

thoughtsSchema.virtual('reactCount')
.get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtsSchema);
module.exports = Thought;