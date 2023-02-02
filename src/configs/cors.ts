import cors from 'cors'

const PROD = true

export const corsoption: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'X-Access-Type-Options',
        'Cross-Origin-Opener-Policy',
    ],
    origin: PROD ? 'http://hamid' : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    maxAge: 100,
    optionsSuccessStatus: 204,
    preflightContinue:false
}