const multer = require('multer');
const path = require('path');


let storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, './uploads')
    }, 
    filename: function(req, file, cb){
     //   let ext = path.extname(file.originalname)
        
        cb(null, `${file.fieldname} _ ${Date.now()} _ ${file.originalname}`)
    }
}) 

let uploads = multer({
    storage: storage
})

module.exports= uploads