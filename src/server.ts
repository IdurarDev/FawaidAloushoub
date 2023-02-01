import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

app.post('/blog', async (req, res) => {
    const blog = await prisma.blog.create({ data: req.body})
    res.json(blog);
})

app.get('/', async (req, res) => {
    const blog = await prisma.blog.findMany()
    res.json(blog)
})

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
})