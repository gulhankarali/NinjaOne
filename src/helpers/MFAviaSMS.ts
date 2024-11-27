import axios from 'axios';
import twilio from 'twilio';
import dotenv from 'dotenv';

const accountSid = 'AC71a8e89879758bb5f74937a3abfcf50e';
const authToken = '5952680f1e68d752d78206dc4793db75';
const twilioPhoneNumber = '+447432798862';


dotenv.config();

const client = twilio(accountSid, authToken);

export async function getLatestSMS(): Promise<string | null> {
    try {
      // Send an SMS using the Messaging Service SID
      const message = await client.messages.create({
        body: 'Your verification code is 123456. Please use this code to verify your account.',
        messagingServiceSid: 'MGaa29b53c326d78ad81d0fb90afe86fc9', // Use Messaging Service SID
        to: '+447432798862', // Your destination phone number
      });
  
      console.log('Message body:', message.body);
  
      const match = message.body.match(/\b\d{6}\b/);
  
      if (match) {
        console.log('Extracted MFA code:', match[0]);
        return match[0]; 
      } else {
        console.error('No 6-digit code found in the message body.');
        return null; 
      }
    } catch (error) {
      console.error('Error sending or fetching message:', error);
      throw error;
    }
  }
  