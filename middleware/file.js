const multer = require("multer");

const MIME_TYPE_MAP = {
    "text/csv": "csv",
    "text/plain": "txt",
    "application/vnd.ms-excel": "xls",
    "application/octet-stream": "csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx"
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.originalname.split('.')[1] === 'csv' && file.mimetype === 'application/vnd.ms-excel') {
            file.mimetype = 'application/octet-stream';
        }
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "./archivos");
    },
    filename: (req, file, cb) => {
        const fecha = new Date();
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (fecha.getDate() < 10) {
            dia = '0' + dia;
        }

        const name = file.originalname.toLowerCase().split(".")[0];
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + fecha.getFullYear() + mes + dia + "." + ext);
    }
});

module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    }
}).single("layoutPolizas");