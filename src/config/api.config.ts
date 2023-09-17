
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
        setAffiliate: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/affiliates`
        },
        setAssistance: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/assistance`
        },
        setAffiliatesSuscription: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/affiliatesSuscription`
        },
        setPayments: {
            method: 'POST',
            url: `${BASE_URL}/api/v1/payments`
        }
    }
}