const majorModel = require('../models/majors');

exports.index = async (req, res) => {
    try {
        const majorsData = await majorModel.findAll();

        if (majorsData.length > 0) {
            res.status(200).json({ 
                code: 200,
                status: 'OK', 
                message: 'Retrieve all data success.',
                data: majorsData  // Langsung gunakan majorsData
            });
        } else {
            res.status(404).json({  // Gunakan status code 404
                code: 404,
                status: 'ERR_DATA_NOT_FOUND', 
                message: 'Data not found!' 
            });
        }
    } catch (err) {
        console.error('Error:', err); // Cetak error ke console
        res.status(500).json({ 
            code: 500,
            status: 'ERR_SERVER_ERROR', 
            message: 'Internal server error!',
            error: err.message  // Tambahkan detail error ke respons
        });
    }
};