import { fetchPhoneNumber, purchasePhoneNumber, releasePhoneNumber, searchAvailablePhoneNumber, sendSMS } from './twilio-sms'
import { Router } from 'express';
export const router = Router();
const STATUS_OK = 200;

router.get('/', function (req, res) {
    res.send('Server is up')
})

router.post('/searchPhoneNumbers', async function (req, res) {
    const result = await searchAvailablePhoneNumber(req.body);
    res.send(result);
})

router.post('/purchasePhoneNumber', async function (req, res) {
    const result = await purchasePhoneNumber(req.body.phoneNumber);
    res.send(result);
})

router.post('/fetchPhoneNumber', async function (req, res) {
    const result = await fetchPhoneNumber(req.body.phoneNumberSid);
    res.send(result);
})

router.post('/releasePhoneNumber', async function (req, res) {
    const result = await releasePhoneNumber(req.body.phoneNumberSid);
    res.send(result);
})

router.post('/sendSMS', async function (req, res) {
    const result = await sendSMS(req.body);
    res.send(result)
})

// Handle a SMS StatusCallback
router.post('/messageStatus', (req, res) => {
    const messageSid = req.body.MessageSid;
    const messageStatus = req.body.MessageStatus;
    console.log(`SID: ${messageSid}, Status: ${messageStatus}`);
    res.sendStatus(STATUS_OK) ;
});