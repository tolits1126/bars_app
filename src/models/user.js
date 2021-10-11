const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model('Client_Details',{
    name: {
        type: String,
        trim: true,
        required: true
    },  
    email:{
        type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if (!validator.isEmail(value)){
                    throw new Error ("Invalid Email Address")
                }

            }
            
    },

    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error ('Age must be on a positive number')
            }

        }
    },

    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
         validate(value){   
            if (value.toLowerCase().includes('password')){
                throw new Error ('Password connot contain "password"')
            }

        }
    }
})

module.exports = User