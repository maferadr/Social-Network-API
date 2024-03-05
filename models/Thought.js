const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema to create a Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            timestamps: true,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    //Use a getter method to format the timestamp on query
    {
        toJSON:{
            getters: true,
        },
        // Create a virtual called `reactionCount` that retrieves 
        // the length of the thought's `reactions` array field on query.
        virtuals: {
            reactionCount: {
                get(){
                    return reactions.length;
                }
            },
        },
    },
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;