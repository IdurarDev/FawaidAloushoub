import { Request, Response, Router } from 'express';
import { Logger } from 'tslog';

export default class ArticleHomeController {
    public router: Router;
    private logger: Logger;

    constructor(logger: Logger) {
        this.router = Router();
        this.logger = logger;
        this.routesApp();
    }

    getAll = async (req: Request, res: Response) => {
        this.logger.info('#getAll() called in article home page')
        return res.send('Marhaban bikoum to the article home page')
    }

    createOne = async () => { }

    getOne = async () => { }

    updateOne = async () => { }

    deleteOne = async () => { }

    routesApp = () => {
        this.router.get('/article', this.getAll)
        this.router.post('/', this.createOne)
        this.router.get('/:id', this.getOne)
        this.router.put('/:id', this.updateOne)
        this.router.delete('/:id', this.deleteOne)
    }
}