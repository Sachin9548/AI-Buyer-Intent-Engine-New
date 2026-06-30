import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import * as dotenv from 'dotenv';
dotenv.config(); 

console.log("DEBUG AWS KEY:", process.env.AWS_ACCESS_KEY_ID ? "Loaded" : "MISSING");

if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("❌ FATAL ERROR: AWS Environment variables are missing!");
}

const client = new DynamoDBClient({ 
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Filhal dummy, baad mein .env mein dalna
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export const docClient = DynamoDBDocumentClient.from(client);