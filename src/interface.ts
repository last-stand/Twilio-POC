export interface SearchAvailablePhoneNumberInput {
    country: string,
    limit: number,
    areaCode?: number,
    contains?: string,
    inRegion?: string,
    smsEnabled?: boolean,
    voiceEnabled?: boolean,
    excludeAllAddressRequired?: boolean,
    nearLatLong?: string,
    distance?: number,
}

export interface SendSMSInput {
    to: string;
    from: string;
    body: string;
    statusCallback?: string;
}