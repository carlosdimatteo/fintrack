const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json())


app.get("/api", (req, res) => {
    res.send('From server')
})

app.post("/api/submit", async (req, res) => {
    res.json({"Message": "Form Submitted"})
    
    const { category, expense, description } = req.body;
    
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });


// Create client instance for auth

    const client = await auth.getClient();


// Instance of Google SHeets API

const googleSheets = google.sheets({ version: 'v4', auth: client });

const spreadsheetId = '18kWvT2weJnHHajoF6pFRSDjL3mtLgLMfjoMsqAjsndI'

    
// Get metadata about spreadsheet

const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
});

    
// Read rows from spreadsheet

const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'Fintrack',
})

    
// Write row(s) to spreadsheet

await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: 'Fintrack!A:C',
    valueInputOption: 'USER_ENTERED',
    resource: {
        values: [
            [category, expense, description]
        ]
    },
})

    // res.send(getRows);
    
})

app.listen(3001, () => console.log(`Server listening on ${PORT}`))
