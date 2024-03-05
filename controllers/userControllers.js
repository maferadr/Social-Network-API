const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

//function to group users and thoughts together

const thoughtsByUser = async (userId) =>
    User.aggregate([
        //only include the user match
        { $match: {_id: new ObjectId (userId)}},
        { $unwind: '$thoughts'},
        {
            $group:{
                _id: new ObjectId(userId),
                thoughts: '$thoughts.username',
            },
        },
    ]);

module.exports = {
    //GET all users
    async getUsers(req,res){
        try{
            const users = await User.find();
            //Should we get an object retrieving data from thoughtsByUser?
            res.json(users);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    //GET a single user by its _id and populated thought and friend data
    async getSingleUser(req, res){
        try{
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

                if(!user){
                    return res.status(404).json({ message: `No user found with this ID!`});
                };
            //We assign a relation between the user and the thoughts that each of them will be displayed
            res.json({
                user,
                thoughtsByUser: await thoughtsByUser(req.params.userId),
            });
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    //POST a new user
    async createUser(req, res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //PUT to update an user by its _id
    async updateUser(req, res){
        try{
            const user = await findOneAndUpdate(
                { _id: req.params.userId },
                //Will be added to the user part of the body.
                { $addToSet: { user: req.body }},
                { runValidators: true, new: true },
            );

            if(!user){
                return res.status(404).json({ message: `No user found with this ID`});
            };

            res.json(user);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },

    //DELETE to remove user by its _id
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user){
                return res.status(404).json({ message: `No user found with this ID!`});
            };

            res.json({ message: `User deleted successfully!`});
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    //  `POST` to add a new friend to a user's friend list
    async addNewFriend(req, res){
        console.log(`You're adding a new Friend to the user's friend list!`)

        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friends }},
                { runValidators: true, new: true}, 
            );

            if(!user){
                return res.status(404)
                .json({ message: `Couldnt add any friends. Not user found.`})
            }

            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },

    // `DELETE` to remove a friend from a user's friend list
    async deleteFriend(req, res){
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friendId : req.params.friendId }}},
                { runValidators: true, new: true },
            );

            if(!user){
                res.status(404).json({ message: `Not user's friend found!`})
            }

            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    }
};
