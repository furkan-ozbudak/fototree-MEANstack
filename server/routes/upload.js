
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const path = require("path");
const uploadDir = "../uploads/";
  
module.exports = function upload(req, res) {
  
    const form = new IncomingForm();

    form.on('file', (field, file) => {
       
        // you can access it using file.path
      
        const readable = fs.createReadStream(file.path);
        //-------
        const writable = fs.createWriteStream(path.join(__dirname,uploadDir+file.name));
        readable.pipe(writable);
        //-------
        res.json({"message":"Upload successfully"})

    });
    form.on('end', () => {
        res.json();
    });
    form.parse(req);
    
};
