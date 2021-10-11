const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "testlang";

MongoClient.connect(connectionURL,{ useNewUrlParser: true },(error, client) => {
    if (error) {
      return console.log("No Connection");
    }
    console.log("connected");

    // INSERTING DATA ON THE DATABASE

    // const db = client.db(databaseName);

    // db.collection("user").insertOne(
    //   {
    
    //     name: "Wilson",
    //     age: 35,
    //   },
    //   (error, client) => {
    //     if (error) {
    //       return console.log("Cannot insert");
    //     }
    //     console.log(client.insertedId);
    //   }
    // );

    // db.collection("task").insertMany(
    //   [
    //     {
    //       task: "Clean the house",
    //       completed: false,
    //     },
    //     {
    //       task: "Finished my home work",
    //       completed: true,
    //     },
    //     {
    //       task: "Do the laundy",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Cannot insert task");
    //     }
    //     console.log(result.insertedIds);
    //   }
    // );

    

    // FIND DATA FROM THE DATABASE

    // //find by ID _id: new ObjectID("6152dbab4a119726ed90775")
    // db.collection("user").findOne({ name: "Wilson" }, (error, user) => {
    //   if (error) {
    //     return console.log("No data found");
    //   }
    //   console.log(user);
    // });

    /*
    //find multiple data
    db.collection("user")
      .find({ age: 33 })
      .toArray((error, user) => {
        console.log(user);
      });

    //count the number of data found
    db.collection("user")
      .find({ age: 33 })
      .count((error, count) => {
        console.log(count);
      });
    */

    //Exercise
    /*
    const db = client.db(databaseName);
    db.collection("task").findOne(
      { _id: new ObjectID("6152c408e16a91d726d8eaa8") },
      (error, task) => {
        if (error) {
          return console.log("No data found");
        }
        console.log(task);
      }
    );

    db.collection("task").find({ completed: false }).toArray((error, task) => {
        console.log(task);
      });
      */

  //const db = client.db(databaseName);
      
  // db.collection("user").updateOne({
  //   _id: new ObjectID("6153b963aff8a1557cb601b4")

  // }, {
  //   $set: {
  //     name: "adt"

  //   }, 

  //     $inc: {
  //       age: 1
  //     }
    


  // }).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // })



/*DELETE MANY
const db = client.db(databaseName)
db.collection('user').deleteMany({age: 33
}).then((result) => {
  console.log(result.deletedCount);
}).catch((error) => {
  console.log(error);
})
  */

const db = client.db(databaseName)
db.collection('task').deleteOne({
  task: "Registration of motorcycle"
}).then((result) => {
  console.log(result.deletedCount);
}).catch((error) => {
  console.log(error);
})


  });


  
  
