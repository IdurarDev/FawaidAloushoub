import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client"
import { Logger } from "tslog";

const newProfile = new PrismaClient();

export default class ProfileController {
    public router: Router;
    private logger: Logger;

    constructor(logger: Logger) {
        this.router = Router();
        this.logger = logger;
        this.routerApp();
    }

    getAll = async (req: Request, res: Response) => {
        this.logger.info('#getAll() called in article home page')
        return res.send('Marhaban bikoum to the profile page')
    }

    createProfile = async (req: Request, res: Response) => {
        this.logger.info(`#createProfile() in profileCustomer start!`)

        const { email, name, bio, plante, articles, blog, blogId } = req.body

        newProfile.profile
            .create({ data: { email, name, bio, plante, articles, blog, blogId } })
            .then((profile) => {
                res.status(200).json({ profile })
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({ error: 'something went wrong sorry !' });
            });
    }

    routerApp = () => {
        this.router.get('/profile', this.getAll);

        this.router.post('/', this.createProfile);
        this.router.get('/:id');


        this.router.put('/');

        this.router.delete('/')
        this.router
        this.router
    }
}