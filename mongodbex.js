const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectId

const connectURL = "mongodb://127.0.0.1:27017"
const databaseName = "test0930"

MongoClient.connect(connectURL,{useNewUrlParser: true}, (error, client) =>{
if(error){
    return console.log('No Connection');
}

const db = client.db(databaseName)

db.collection('user').deleteOne({_id: new ObjectID("6155083e79d43354b7fd25af")
}).then((result) => {
    console.log(result.deletedCount);
}).catch((error) => {
    console.log(error);
})

})

