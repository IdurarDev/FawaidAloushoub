import env from 'dotenv'

env.config()

const PROD = true

export const urlConfig = {
    homePageUrl: `${process.env.URL_ENTRY}/`,
    blogUrl: `${process.env.URL_ENTRY}/blog`,
    articleUrl: `${process.env.URL_ENTRY}/articles`,
    planteUrl: `${process.env.URL_ENTRY}/plantes`,
    redirectUrl: PROD ? 'https://hamid.berkaine.com' : 'http://localhost:3000'
}