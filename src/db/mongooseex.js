const mongoose = require('mongoose')
const validator = require('validator')
const { required } = require('yargs')

mongoose.connect('mongodb://127.0.0.1:27017/mongoose0930-api',{
useNewUrlParser: true,
useUnifiedTopology: true
})

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        default: 0,
        trim: true,
        validate(value){
            if(value < 0){
                throw new Error ('Age must be in positive number')
            }
        }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Invalid Email Address')
            }

        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
               if(value.toLowerCase().includes('password')){
                   throw new Error ('Invalid password. "password"')
               }


        }

    }


})

const details = new User({
    name: 'Jose',
    age: 33,
    email: "Jose122@yahoo.com",
    password: "@Dimasilaw40"
})

details.save().then(() => {
    console.log(details);
}).catch((error) => {
        console.log('Error',error);
})

