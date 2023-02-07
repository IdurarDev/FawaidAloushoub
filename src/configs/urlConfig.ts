import env from 'dotenv'

env.config()

const PROD = true

export const urlConfig = {
    homePageUrl: `${process.env}/`,
    blogUrl: `${process.env}/blog`,
    articleUrl: `${process.env}/articles`,
    planteUrl: `${process.env}/plantes`,
    profileUrl: `${process.env}/profile`,
    redirectUrl: PROD ? 'https://hamid.berkaine.com' : 'http://localhost:3000'
}