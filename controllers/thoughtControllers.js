const { Thought } = require('../models');

module.exports = {
    //Get all thoughts
    async getThoughts(req, res){
        try{
            const thoughts = await Thought.find().populate('users');
            res.json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //`GET` to get a single thought by its `_id`
    async getSingleThought(req, res){
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate('users');

                if(!thought){
                    return res.status(404).json({ message: 'No thought found with this ID'});
                }
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //`POST` to create a new thought (don't forget to push the created 
    //thought's `_id` to the associated user's `thoughts` array field)
    async createThought(req, res){
        try{
            const thought = await Thought.create(
                { thoughts: req.params.thoughtId },
                { $push: { thoughts: req.params.thoughtId }},
                { new: true }
            );
            res.json(thought);
        }catch(err){
            console.log(err);
            return res.json(500)
        }
    },

    //`PUT` to update a thought by its `_id`
    async updateThought(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if(!thought){
                res.status(404).json({ message: `No though found with this ID`});
            }

            res.json(thought);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },

    //`DELETE` to remove a thought by its `_id`
    async deleteThought(req, res){
        //Do we have to specify that this thought belongs to any user? _id: {$in : thought.users }
        try{
            const thought = await findOneAndDelete({ _id: req.params.thoughtId });
            if(!thought){
                res.status(404).json({ message: `No thought found with this ID`});
            }

        }catch(err){
            res.status(500).json(err);
        }
    },

    //POST reactions
    async createReaction(req, res){
        console.log(`You're creating a reaction to this thought!`);
        console.log(req.body);

        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            );

            if(!thought){
                return res.status(404).json({ message: `No thought has been found with this ID`});
            }

            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE reactions 
    async deleteReaction(req, res){
        //Regarding the practices in class its findOneAndUpdate => Why isnt it Delete?
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { runValidators: true, new: true }
            );

            if(!thought){
                return res.status(404)
                    .json({ message: `Couldnt delete this reaction. Thought not found`})
            }

            res.json(thought);

        }catch(err){
            res.status(500).json(err);
        }
    }
};