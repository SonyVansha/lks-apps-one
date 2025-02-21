const fs            = require('fs')
const path          = require('path')
const redisClient   = require('../config/redis_config')
const flatCachelib  = require('flat-cache')
const env           = require('../env')

let redisCache = (req, res, next) => {
    let key = "__API_ENDPOINT__" + req.originalUrl || req.url
    redisClient.get(key, (err, reply) => {
        if (reply) {
            res.json(JSON.parse(reply))
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                redisClient.set(key, body, 'EX', 60)
                res.sendResponse(body)
            }
            next()
        }
    })
}

let flatCache = (req, res, next) => {
    const cache_path = env.cache_path || path.join(__dirname, '../tmp');

    // Buat direktori cache jika belum ada
    if (!fs.existsSync(cache_path)) {
        fs.mkdirSync(cache_path, { recursive: true });
    }

    // Load cache
    const fCache = flatCachelib.load("__API_ENDPOINT__" + req.originalUrl, path.resolve(`${cache_path}`));
    const dateTime = new Date().getTime();

    // Key cache (gunakan req.originalUrl sebagai key)
    const keyId = '__express__' + req.originalUrl;

    // Waktu kedaluwarsa cache (misalnya, 5 menit)
    const expireTime = 5 * 60 * 1000; // 5 menit dalam milidetik
    const keyData = {
        expire: dateTime + expireTime, // Waktu kedaluwarsa
        data: keyId // Data yang disimpan
    };

    // Cek cache
    const cacheContent = fCache.getKey(keyId); // Gunakan keyId sebagai key

    if (cacheContent && dateTime < JSON.parse(cacheContent).expire) {
        // Jika cache ada dan belum kedaluwarsa, kirim respons dari cache
        res.json(JSON.parse(cacheContent).data);
        return;
    } else {
        // Jika cache tidak ada atau kedaluwarsa, lanjutkan ke endpoint
        const originalSend = res.send;
        res.send = (body) => {
            // Simpan respons ke cache
            fCache.setKey(keyId, JSON.stringify({
                expire: dateTime + expireTime,
                data: body
            }));
            fCache.save(); // Simpan cache ke file
            originalSend.call(res, body); // Kirim respons asli
        };
        next();
    }
};


module.exports = { redisCache, flatCache };