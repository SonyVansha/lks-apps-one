const multer = require('multer')
const multerS3 = require('multer-s3')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const AWS = require('aws-sdk')
const env = require('../env')

// Fungsi untuk menentukan ekstensi berdasarkan mimetype
const getFileExtension = (mimetype, allowedTypes) => {
    const mimeMap = {
        'image/png': 'png',
        'image/jpg': 'jpg',
        'image/jpeg': 'jpeg',
        'application/pdf': 'pdf'
    }
    return allowedTypes.includes(mimetype) ? mimeMap[mimetype] : null
}

const filesUploadLocalStorage = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const path = 'tmp'
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true })
            }
            callback(null, path)
        },
        filename: (req, file, callback) => {
            const fileExt = getFileExtension(file.mimetype, ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'])
            if (!fileExt) return callback(new Error('Invalid file type'), null)

            callback(null, `${uuid()}.${fileExt}`)
        }
    })

    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            const allowedTypes = file.fieldname === 'profilePics' 
                ? ['image/png', 'image/jpg', 'image/jpeg'] 
                : ['application/pdf']

            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('Only .png, .jpg, .jpeg, and .pdf format allowed!'), false)
            }
            cb(null, true)
        }
    }).fields([{ name: 'profilePics', maxCount: 1 }, { name: 'document', maxCount: 1 }])

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                code: 'ERR_UPLOAD_FILE',
                status: 'Error Upload File!',
                message: err.message
            })
        }
        next()
    })
}

const filesUploadS3 = (req, res, next) => {
    const s3 = new AWS.S3({
        accessKeyId: env.aws.accessKeyId,
        secretAccessKey: env.aws.secretAccessKey,
        sessionToken: env.aws.sessionToken
    })

    const storageS3 = multerS3({
        s3: s3,
        bucket: env.aws.Bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) => {
            const fileExt = getFileExtension(file.mimetype, ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'])
            if (!fileExt) return callback(new Error('Invalid file type'), null)

            const folder = file.fieldname === 'profilePics' ? 'pictures' : 'documents'
            callback(null, `${folder}/${uuid()}.${fileExt}`)
        }
    })

    const upload = multer({
        storage: storageS3,
        fileFilter: (req, file, cb) => {
            const allowedTypes = file.fieldname === 'profilePics' 
                ? ['image/png', 'image/jpg', 'image/jpeg'] 
                : ['application/pdf']

            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('Only .png, .jpg, .jpeg, and .pdf format allowed!'), false)
            }
            cb(null, true)
        }
    }).fields([{ name: 'profilePics', maxCount: 1 }, { name: 'document', maxCount: 1 }])

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                code: 'ERR_UPLOAD_FILE',
                status: 'Error Upload File!',
                message: err.message
            })
        }
        next()
    })
}

module.exports = { filesUploadLocalStorage, filesUploadS3 }
