
export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const API_CONFIG = {
    endpoints: {
        login: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/login`
        },
        getAffiliates: {
            method: 'GET',
            url: `${BASE_URL}/api/v1/affiliates`
        },
        getAffiliateByNumeroDocumento: {
            method: 'GET',
            url: `${BASE_URL}/api/v1/affiliates/:numeroDocumento`
        },
        setAffiliate: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/affiliates`
        },
        setAssistance: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/assistance`
        },
        getAssistances: {
            method: 'GET',
            url: `${BASE_URL}/api/v1/assistance`
        },
        getAssistancesToday: {
            method: 'GET',
            url: `${BASE_URL}/api/v1/assistancesToday`
        },
        nonAttendance: {
            method: 'GET',
            url: `${BASE_URL}/api/v1/nonAttendance`
        },
        setAffiliatesSuscription: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/affiliatesSuscription`
        },
        getAffiliatesSuscription: {
            method: 'GET',
            url: `${BASE_URL}/api/v1/affiliatesSuscription/:id`
        },
        setPayments: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/payments`
        }
    }
}