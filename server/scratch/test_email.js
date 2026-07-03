import dotenv from 'dotenv';
import { sendLeadNotification } from '../email.js';

dotenv.config();

console.log('--- Email Setup Test Run ---');
console.log('EMAIL_USER configured:', process.env.EMAIL_USER ? 'YES' : 'NO');
console.log('EMAIL_PASS configured:', process.env.EMAIL_PASS ? 'YES (hidden)' : 'NO');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log('\nERROR: Missing EMAIL_USER or EMAIL_PASS environment variables.');
  console.log('Please add them to your local .env file or Render dashboard variables.');
  process.exit(1);
}

console.log('\nSending test email connection check...');

const testLead = {
  name: "System Tester",
  email: "test@aperio.studio",
  businessName: "Aperio Test Launch",
  budget: "$10k+",
  projectDetails: "This is a system verification test to confirm SMTP routing works successfully."
};

sendLeadNotification(testLead).then(() => {
  console.log('\nFinished test execution. Please check your inbox or server logs.');
});
