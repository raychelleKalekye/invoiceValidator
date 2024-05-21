
const express = require('express');
const router = express.Router();
const pdf2pic = require("pdf2pic");
const Tesseract = require('tesseract.js');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', async (req, res) => {
    try {
        const pdfFile = req.file; 
        if (!pdfFile) {
            return res.status(400).send('No PDF file uploaded');
        }
       
        const pdf2picOptions = {
            density: 100,
            saveFilename: "page",
            savePath: "./output",
            format: "png",
            width: 600,
            height: 800
        };
        const pdf2picConverter = new pdf2pic(pdfFile.path, pdf2picOptions);
        const images = await pdf2picConverter.convert(1);

       
        const extractedTexts = await Promise.all(images.map(imagePath => Tesseract.recognize(imagePath)));

        const invoiceNo = extractInvoiceNumber(extractedTexts);
        const schoolaccNo = extractSchoolAccountNumber(extractedTexts);

        const invoiceData = await database.query('SELECT * FROM invoices WHERE invoiceNo = ? AND schoolaccNo = ?', [invoiceNo, schoolaccNo]);

        let validationMessage;
        if (invoiceData.length === 0) {
            validationMessage = 'Invoice not found or invalid';
        } else {
            validationMessage = 'Invoice validated successfully';
        }

        res.render('validationResult', { validationMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

function extractInvoiceNumber(texts) {
 
    const invoiceRegex = /invoice\s*number\s*:\s*(\w+)/i;
    const matches = texts.match(invoiceRegex);
    if (matches && matches.length > 1) {
        return matches[1]; 
    return null;

function extractSchoolAccountNumber(texts) {
  
    const accountRegex = /school\s*account\s*number\s*:\s*(\w+)/i;
    const matches = texts.match(accountRegex);
    if (matches && matches.length > 1) {
        return matches[1]; 
    }
    return null; 
}
    }}
module.exports = router
