const connection = require('../config/connection');
const { User, Thought } = require('../models');
const data = require('./data.json');

// Checking if the connection throws an error
connection.on('error', (err) => err);

// If not, the connection will be open
connection.once('open', async ()=>{
    console.log('Connected!');

    //Delete any collection if exists
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if(thoughtsCheck.length){
        await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users'}).toArray();
    if(usersCheck.length){
        await connection.dropCollection('users');
    }

    //Create an empty array to hold users
    const users = [];

    for(let i = 0; i < users.length; i++){
        const username = this.username;
        const email = this.email;
        //Ask the way to grab thoughts => Where would we be retrieving this from?
        const friends = this.friends;

        users.push({
            username,
            email,
            friends
        });
    }

    //Add users to the collection and await the results
    const userData = await User.insertMany(users);
    userData.json(data);

    //Add thoughts to the collection and await the results
    await Thought.create({
        // How to specify the thoughtText?
        username: [...userData.map(({_id}) => _id )],
    });

    //Log out the data
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})