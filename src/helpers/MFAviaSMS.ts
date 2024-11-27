import axios from 'axios';
import twilio from 'twilio';
import dotenv from 'dotenv';

const accountSid = '';
const authToken = '';
const twilioPhoneNumber = '';


dotenv.config();

const client = twilio(accountSid, authToken);

export async function getLatestSMS(): Promise<string | null> {
    try {
      const message = await client.messages.create({
        body: 'Your verification code is 123456. Please use this code to verify your account.',
        messagingServiceSid: '', 
        to: '+', 
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
  