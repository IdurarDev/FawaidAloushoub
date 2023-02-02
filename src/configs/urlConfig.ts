import env from 'dotenv'

env.config()

const PROD = true

export const urlConfig = {
    blogUrl: `${process.env.URL_ENTRY}/blog`,
    articleUrl: `${process.env.URL_ENTRY}/article`,
    planteUrl: `${process.env.URL_ENTRY}/plante`,
    homePageUrl: `${process.env.URL_ENTRY}/homePage`,
    redirectUrl: PROD ? 'https://hamid.berkaine.com' : 'http://localhost:3000'
}