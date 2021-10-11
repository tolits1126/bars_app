const mongoose = require('mongoose')
const validator = require('validator')
const csv = require('csv-parser')
const fs = require('fs')
const result=[]


fs.createReadStream('./test_file/valid-csv.csv')
    .pipe(csv({}))
    .on('data', (data) => result.push(data))
    .on('end', () => {
        console.log(result);
    })
  

 
    fs.readFile('./test_file/valid-txt.txt', 'utf8',(error, data) => {
        if (error) {
            return console.log(error);
        }
        console.log(data);
    })
  



// const FileReader = mongoose.model('billings',{
 
//     date:{
//         type: String,
//             //required: true,
//             //trim: true,
//             //lowercase: true,
//             checkFalsy: true,
//             checkNull: true,
            
//            //validate(value){
//                //if (validator.checkNull(value)){
//                //     console.log(value);
//                 //    throw new Error ('No Record Found!')
//                 //}
                
//             //}
            
//     },



// })

// module.exports = FileReader














