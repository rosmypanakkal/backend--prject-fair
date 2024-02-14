
// import multer middleware

const multer = require('multer')

// to set multer configuration-to store multer data
const storage =multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    // create a file name
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

// to set filter
const fileFilter =(req,file,callback)=>{
    const allowedMimeTypes =['image/png','image/jpeg','image/jpg']
    if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null,true)
        
    } else {
        callback(null,false)
        return callback(new Error("Invalid file type....must be include png or jpeg or jpg"))
    }
}

const multerConfig = multer({
    storage,fileFilter
})


module.exports = multerConfig