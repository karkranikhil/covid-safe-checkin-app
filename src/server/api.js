// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');

// loading env files
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
//extracting credentials from env
const {SHEET_ID, CLIENT_EMAIL, PRIVATE_KEY} = process.env

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

//google sheet function

async function accessSpreadsheet(){
    try{
        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet(SHEET_ID);
        // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY.replace(/\\n/gm, '\n')
        });

        await doc.loadInfo(); // loads document properties and worksheets
        console.log(doc.title);
        return doc.title
    }catch(error){
        console.error(error)
    }
}


app.get('/api/v1/test', (req, res) => {
    res.json({ msg:"Api is running successfully", success: true });
});

app.get('/api/v1/sheetname',async (req, res) => {
    const sheetName = await accessSpreadsheet()
    res.json({ sheetName, success: true });
});


app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
