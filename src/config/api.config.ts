
export const API_CONFIG = {
    baseUrl: import.meta.env.BASE_URL,
    endpoints: {
        getAffiliates: {
            method: 'GET',
            url: '/api/v1/affiliates'
        },
        setAffiliate: {
            method: 'POST',
            url: '/api/v1/affiliates'
        }
    }
}