const LIVE_TWILIO_ACCOUNT_SID = 'TwilioLiveAccountSid';
const LIVE_TWILIO_AUTH_TOKEN = 'TwilioLiveAuthToken';
const TWILIO_ACCOUNT_SID = 'TwilioTestAccountSid';
const TWILIO_AUTH_TOKEN = 'TwilioTestAuthToken';
import { Twilio } from 'twilio';
import { RecordListInstanceOptions } from 'twilio/lib/rest/api/v2010/account/usage/record';
import * as contract  from './interface';
const client = new Twilio(LIVE_TWILIO_ACCOUNT_SID, LIVE_TWILIO_AUTH_TOKEN);

// Find available phone numbers to buy
/**
 * example link
 * https://www.twilio.com/docs/phone-numbers/api/availablephonenumberlocal-resource?code-sample=code-find-available-local-phone-numbers-by-area-code&code-language=Node.js&code-sdk-version=3.x
 *
 *  country: string = 'US',
    areaCode: number = 510,
    contains: string = '510555****',
    inRegion: 'AR',
    smsEnabled: true,
    voiceEnabled: true,
    excludeAllAddressRequired: true,
    nearLatLong: '37.840699,-122.461853',
    distance: 50,
 */

export async function searchAvailablePhoneNumber(
    input: contract.SearchAvailablePhoneNumberInput = {
        country: 'IN',
        limit: 100,
    }
) {
    try {
        const searchParam = { limit: input.limit };
        input.areaCode && Object.assign(searchParam, { areaCode: input.areaCode });
        input.inRegion && Object.assign(searchParam, { inRegion: input.inRegion });
        input.contains && Object.assign(searchParam, { contains: input.contains });
        input.nearLatLong && Object.assign(searchParam, { nearLatLong: input.nearLatLong });
        input.distance && Object.assign(searchParam, { distance: input.distance });
        typeof input.smsEnabled === 'boolean' && Object.assign(searchParam, { smsEnabled: input.smsEnabled });
        typeof input.voiceEnabled === 'boolean' && Object.assign(searchParam, { voiceEnabled: input.voiceEnabled });
        typeof input.excludeAllAddressRequired === 'boolean'
            && Object.assign(searchParam, { excludeAllAddressRequired: input.excludeAllAddressRequired });
        const result = await client.availablePhoneNumbers(input.country)
                        .local
                        .list(searchParam)
        return result;
    } catch (e) {
        throw e;
    }
}

export async function purchasePhoneNumber(phoneNumber: string = '+15005550006') {
    try {
        const result = await client.incomingPhoneNumbers.create({
            phoneNumber,
        });
        return result;
    } catch (e) {
        throw e;
    }
}

export async function fetchPhoneNumber(phoneNumberSid: string = 'PNc1f795bdd30f4480d250c4828cec4527') {
    try {
        const result = await client.incomingPhoneNumbers(phoneNumberSid).fetch();
        return result;
    } catch (e) {
        throw e;
    }
}

export async function releasePhoneNumber(phoneNumberSid: string = 'PNc1f795bdd30f4480d250c4828cec4527') {
    try {
        const result = await client.incomingPhoneNumbers(phoneNumberSid).remove();
        return result;
    } catch (e) {
        throw e;
    }
}

export async function sendSMS(
    input: contract.SendSMSInput = {
        to: '+919353752454',
        from: '+15005550006',
        body: 'Hello, test sms from JP',
    }
) {
    const params: contract.SendSMSInput = {
        body: input.body,
        to: input.to,
        from: input.from,
    };
    input.statusCallback && Object.assign(params, { statusCallback: input.statusCallback });
    try {
        const result = await client.messages.create(params);
        return result;
    } catch (e) {
        throw e;
    }
}

/**
 * example link
 * https://www.twilio.com/docs/usage/api/usage-record
*/
export async function getUsage() {
    try {
        const filterOpts: RecordListInstanceOptions = {
            category: 'sms-outbound',
            startDate: new Date('2020-10-25'),
            endDate: new Date('2020-11-4')
        };
        // One-Month Date-Range, Inbound SMS Only
        // return client.usage.records?.list(filterOpts);

        // Last Month's Usage for sms
        // return client.usage.records?.lastMonth?.list({category: 'sms'});

        // Today's SMS
        // return client.usage.records?.today?.list({category: 'sms'});

        // Daily Usage for Inbound SMS Over a One-Month Period
        return client.usage.records?.daily?.list(filterOpts);
    } catch (e) {
        throw e;
    }
}