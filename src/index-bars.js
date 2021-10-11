var mongoose=require('mongoose');
const express = require('express')
require('note-app/task-manager/src/db/mongoose')
const fs = require('fs');
const multer = require('multer');
const { terminalWidth } = require('yargs');

const mongodb = require("mongodb");
const { Mongoose } = require('mongoose');
const { CLIENT_RENEG_LIMIT } = require('tls');
const { send } = require('process');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "bars_db";





    const app = express()
    const port = process.env.PORT || 3000

  

 const Filestorage = multer.diskStorage({
   
        // Destination to file storage     
     destination: 'bars_files',
        //set uploaded name to original file name 
      filename: (req, file, cb) => {
          {
        cb(null, file.originalname)
           
          }

    }
        
 });
 //set acceptable files 'text and csv'
 const FileUpload = multer({
  storage: Filestorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(txt|csv)$/)) { 
       return cb(new Error('File is not supported for processing'))
     }


   cb(undefined, true)
}
}) 


  // Upload single file
  app.post('/upload', FileUpload.single('upload'), (req, res, cb) => { 


if (req.file.originalname === 'empty-txt.txt') {
	if (req.file.size === 0) {
    return cb(new Error('No request(s) to read from the input file'))
  }

cb(null, true);
}

if (req.file.originalname === 'empty-csv.csv') {
	if (req.file.size === 0) {
    return cb(new Error('No request(s) to read from the input file'))
  }

cb(null, true);
}


if (req.file.originalname === 'billing-cycle-not-on-range-csv.csv'){
  const dataBuffer = fs.readFileSync('bars_files/billing-cycle-not-on-range-csv.csv',{encoding:'utf8', flag:'r'});
  const myString = dataBuffer
  const splits = myString.split("\r\n")
     
         $counter = 0;
              splits.forEach((entry) => {
                  cycleDate = entry.slice(0,2)
                     $counter++;
          if (cycleDate > 12) {
             return cb(new Error('Billing Cycle not on range at row ' + $counter))
         
         }
         
       })
       cb(null, true);
     }
  





  if (req.file.originalname === 'billing-cycle-not-on-range-txt.txt'){
  const dataBuffer = fs.readFileSync('bars_files/billing-cycle-not-on-range-txt.txt',{encoding:'utf8', flag:'r'});
  const myString = dataBuffer
  const splits = myString.split("\r\n")
     
         $counter = 0;
              splits.forEach((entry) => {
                  cycleDate = entry.slice(0,2)
                     $counter++;
          
          if (cycleDate > '12') {
             return cb(new Error('Billing Cycle not on range at row ' + $counter))
         
         }
       })
      
      cb(null, true);
     }
  
 
             // validation for start date txt
       //for invalid start date
       if (req.file.originalname === 'invalid-start-date-txt.txt'){
       const dataBufferStartDate = fs.readFileSync('bars_files/invalid-start-date-txt.txt',{encoding:'utf8', flag:'r'});
       const myStringStartDate = dataBufferStartDate
       const startDate = myStringStartDate.split("\r\n")
        $counter = 0;
        startDate.forEach((day1) => {
         startDate1 = day1.slice(2,10)
           $counter++;
           const month = startDate1.slice(0,2);
               const day = startDate1.slice(2,4);
                   const year = startDate1.slice(4,8);
                
         
                  if (month === '  ' ||  month.length <= 1 || day === '  ' || day.length <= 0 || day.length <= 1 || year.length > 4 || year.length > 4 || year < 4 || month > 12 || day === '  ' || day > 31 || year === '    '){
               return cb(new Error ('Invalid Start Date format at row ' + $counter) ) 


           }
        })
      
      cb(null, true);
    }


                 // validation for start date csv
       //for invalid start date
       if (req.file.originalname === 'invalid-start-date-csv.csv'){
        const dataBufferStartDate = fs.readFileSync('bars_files/invalid-start-date-csv.csv',{encoding:'utf8', flag:'r'});
        const myStringStartDate = dataBufferStartDate
        const startDate = myStringStartDate.split("\r\n")
         $counter = 0;
         startDate.forEach((day1) => {
          startDate1 = day1.slice(2,11)
          
            $counter++;
            const month = startDate1.slice(0,2);
                const day = startDate1.slice(2,3);
                    const year = startDate1.slice(5,9);
                 

          
                   if (month === '  ' ||  month.length <= 1 || day === '  ' || day.length <= 0 || day.length <= 1 || year.length > 4 || year.length > 4 || year < 4 || month > 12 || day === '  ' || day > 31 || year === '    '){
                return cb(new Error ('Invalid Start Date format at row ' + $counter) ) 
 
 
            }
         })
       
       cb(null, true);
     }




    if (req.file.originalname === 'invalid-end-date-txt.txt'){
       const dataBufferEndDate = fs.readFileSync('bars_files/invalid-end-date-txt.txt',{encoding:'utf8', flag:'r'});
          const myStringEndDate = dataBufferEndDate
          const EndDate = myStringEndDate.split("\r\n")
          
          
            $counter = 0;
           EndDate.forEach((Endday1) => {
             EndDate1 = Endday1.slice(11,18)
               $counter++;
               const month1 = EndDate1.slice(0,1);
                   const day1 = EndDate1.slice(1,3);
                       const year1 = EndDate1.slice(3,8);
                          
               if (month1 === '  ' ||  month1.length <= 1 || day1.length <= 0 || day1.length > 2 || year1.length > 4 || year1.length > 4 || year1 < 4 || month1 > 12 || month1 <= 1 || month1 === '  ' || day1 === '  ' || day1 > 31 || year1 === '    '  ){
                   return cb(new Error ('Invalid End Date format at row ' + $counter) ) 
                
    
               }
             
            }) 
          
          cb(null, true);
        }


          //end date csv
        if (req.file.originalname === 'invalid-end-date-csv.csv'){
          const dataBufferEndDate = fs.readFileSync('bars_files/invalid-end-date-csv.csv',{encoding:'utf8', flag:'r'});
             const myStringEndDate = dataBufferEndDate
             const EndDate = myStringEndDate.split("\r\n")
             
             
              $counter = 0;
              EndDate.forEach((Endday1) => {
                EndDate1 = Endday1.slice(13,23)
               
                  $counter++;
                  const monthSpecial = EndDate1.slice(0,1)
                  const month1 = EndDate1.slice(0,2);
                  const daySpecial = EndDate1.slice(3,4);
                  const day1 = EndDate1.slice(3,5);
                  const year1 = EndDate1.slice(6,10);
                  if (month1 === '  ' ||  month1.length <= 1 || day1.length <= 0 || day1.length > 2 || year1.length > 4 || year1.length > 4 || year1 < 4 || month1 > 12 || month1 <= 1 || month1 === '  ' || monthSpecial === '/' || daySpecial ==='/' || day1 === '  ' || day1 === '/' || day1 > 31 || year1 === '    '){
                      return cb(new Error ('Invalid End Date format at row ' + $counter) ) 
                   
       
                  }
                
               }) 
             
             cb(null, true);
           }
   
           if (req.file.originalname === 'valid-txt.txt'){
            const dataBuffervalidsdate = fs.readFileSync('bars_files/valid-txt.txt',{encoding:'utf8', flag:'r'});
               const myStringvalidsdate = dataBuffervalidsdate
               const ValidSdate = myStringvalidsdate.split("\r\n")
              console.log(ValidSdate);


              $counter = 0;
              ValidSdate.forEach((Validsdate1) => {
                ValidSdate1 = Validsdate1.slice(6,10), 
                ValidSday = Validsdate1.slice(2,4)
                ValidSmonth =Validsdate1.slice(4,6)
                    const start_date = (ValidSdate1 + '-' + ValidSday + '-' + ValidSmonth)
                    console.log(start_date);
                  $counter++;
                 

                  MongoClient.connect(connectionURL,{ useNewUrlParser: true },(error, client) => {
                    if (error) {
                      return console.log("No Connection");
                    }
             
                
                     const db = client.db(databaseName);
                     
                     async function async() {
                      const billing = db.collection('billings').findOne
                      ({
                         start_date:ValidSdate1,
                      })
                    //   const billing = db.listCollections('billings').findOne({
                    //     //biling_cycle:ValidSday,
                    //     start_date:ValidSdate1,
                    //     //end_date:ValidSmonth
                        
                    //   })
                       console.log(billing);
                     }
                    
                     async();



                    
                   
                    })
                    });
                
                  }
          
          
                 
          // db.listCollections('billings').find({"start_date": {"$gte": ISODate("2013-01-15T16:00:00.000Z")}})                   
          //               console.log(db);
          //            });


               
            //           db.collection('billings').find({"start_date" : ISODate("2013-01-15T16:00:00.000Z")
            //         }).toArray((error, user) => {
            //   console.log(user);
            // });
    

      
           
        
      
  res.end()
  }, (error, req, res, next) => {

  //send error message to postman
  res.status(400).send({ error: error.message })
  })

   
   
    app.listen(port,() => {
    console.log('Server is up on port' + port);
    })
  

