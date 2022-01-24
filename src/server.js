/*READ ME BEFORE USING!!!
make sure node is installed
make sure you install the mongodb nodejs driver. this has utilites to query items from the db as well as connect to our db
you can do that by running the command 'npm install mongodb'
use 'node -v' and 'npm list mongodb' to make sure it's installed.
*/


const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb');
const bodyParser=require('body-parser')

const app = express();

//app.use(express.static(path.resolve(__dirname, '../src')));
//app.use(bodyParser.urlencoded({ extended: false }));


async function main() {

    const uri = "mongodb+srv://admin:wRL4TunOWhdiawtI@projectgg.vop1o.mongodb.net/test";

    //storing the above into a variable so the code looks cleaner
    
    const client = new MongoClient(uri);
    try{
        await client.connect();
        
        //This will try to find the user by email ofc we will have to store a document.getelementbyid into a var
        //and pass it into this function?
        await findUserByEmail(client, "some@email.com");
        await findUserByEmail(client, "nonemail@email.com");
        
        
        //This is where we add new users by using getElementById, save it to a variable, and put it in the Object?
        //see database, new user should already be created
        /*await createUser(client, {
            firstName: "anotherNew", //ex. const name = document.getElementByID may need to initialize the variable
            lastName: "AnotherUser",
            email: "anothernewuser@email.com",
            password: "anothernewuserpass",
            level: "5"
        })*/

        //await listDatabases(client);

    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
}
main().catch(console.error);

app.post('/post-feedback', function (req, res) {
    client.then(function(db) {
        delete req.body._id; // for safety reasons
        db.collection('users_info').insertOne(req.body);
    });    
    res.send('Data received:\n' + JSON.stringify(req.body));
});


//The functions created below are querys that look up information about the databases


//This function looks through the DB for a user email. will be useful for finding out if user exists or not
//This is the Read part of CRUD
async function findUserByEmail(client, userEmail) {
    const result = await client.db("ProjectGG").collection("users_info").findOne({email: userEmail});

    if (result){
        console.log(`User with this email already exists ${userEmail}`);
        console.log(result);
    } else {
        console.log(`User with this email has not been created '${userEmail}'`);
    }

}


//This is the function to add a new user using the MongoDB client and newUser as an object (see await createUser call above)
//This is the Create part of CRUD
async function createUser(client, newUser) {
    const result = await client.db("ProjectGG").collection("users_info").insertOne(newUser);
    
    console.log(`New user created. ID: ${result.insertID}`);
}


//The below is not really important to want we want, it is just listing the DB's that are in our MONGO DB
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("This is the list of Databases in our Mongo Atlas account:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`); //this like a 'printf' method in javascript formatted like ${var}
    })
}