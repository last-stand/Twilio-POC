import {
    fetchPhoneNumber,
    getUsage,
    purchasePhoneNumber,
    releasePhoneNumber,
    searchAvailablePhoneNumber,
    sendSMS
} from './twilio-sms'
import { Router } from 'express';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
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

// Respond to an incoming text message
router.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message('The Robots are coming! Head for the hills!');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

router.get('/usage', async function (req, res) {
    const result = await getUsage();
    res.send(result)
})