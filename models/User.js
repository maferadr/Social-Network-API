const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');

//Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        //Is it like this or importing the thoughtSchema file?
        thoughts: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        ],
        // Create a virtual called `friendCount` that retrieves the length of the user's 
        // `friends` array field on query.
    },
    {
            virtuals: {
                friendCount: {
                    get(){
                        return friends.length;
                    }
                }
            }
        }
)

const User = model('user', userSchema);

module.exports = User;