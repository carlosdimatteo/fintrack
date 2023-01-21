import axios from 'axios';

export function getSheetData() {}
const SPREADSHEET_ID = '';
const SHEET_ID = '';
const API_KEY = '';

export async function appendExpenseRowToSheet(data) {
	const res = axios.post(
		`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`,
		{
			requests: [
				{
					sheetId: SHEET_ID,
					// row data : https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#RowData
					rows: [mapValuesToRowData(data)],
					fields: '*',
				},
			],
			includeSpreadsheetInResponse: true,
			responseIncludeGridData: true,
		},
	);
	console.log(res.data);
	return res;
}

function mapValuesToRowData(data) {
	/** donde data es : 
        Fecha
        Categoria 
        Valor
        Descripcion
        Moneda
     */
	return {
		// cell data : https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#CellData
		values: [
			{
				// cell value : https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#CellData
				userEnteredValue: {
					// extended value : https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#ExtendedValue
					numberValue: data.amount,
				},
			},
		],
	};
}
