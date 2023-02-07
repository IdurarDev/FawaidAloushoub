import express from 'express';
import env from 'dotenv';
import { ILogObject, Logger } from 'tslog';
import { appendFileSync } from 'fs';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

import { urlConfig } from './configs/urlConfig';
import BlogHomeController from './controllers/blogHomeController';
import HomePageController from './controllers/homePageController';
import ArticleHomeController from './controllers/articleHomeController';
import PlanteHomeController from './controllers/planteHomeController';
import ProfileController from './controllers/profileController';

env.config()

// const port = 3000;

/**
 * class Server 
 * Entry app
 */
class Server {
    private app: express.Application;
    private logger: Logger;
    private blogHomeController: BlogHomeController;
    private homePageController: HomePageController;
    private articleHomeController: ArticleHomeController;
    private planteHomeController: PlanteHomeController;
    private profileController: ProfileController;

    constructor() {
        this.app = express();
        this.app.use(express.json()); // for post and put requests 
        this.app.use(express.urlencoded({ extended: true }));  // for post and put requests
        this.logger = new Logger();
        this.logger.attachTransport({
            silly: this.logToTransport,
            debug: this.logToTransport,
            trace: this.logToTransport,
            info: this.logToTransport,
            warn: this.logToTransport,
            error: this.logToTransport,
            fatal: this.logToTransport,
        });
        this.logger.setSettings({
            dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });

        this.configPortApp();
        this.routesApp();
    }

    /**
     * config logger transport
     * @param logObject {IlogObject} <= interface tslog
     */
    public logToTransport = (logObject: ILogObject) => {
        appendFileSync('logs.log', JSON.stringify(logObject) + '\n');
    }

    /**
     * port app config
     */
    public configPortApp = () => {
        this.app.set('port', process.env.PORT_APP || 3000)
    }

    /**
     * routes app config
     */
    public routesApp = async () => {
        this.logger.info('Routes app started...');

        await prisma.$connect();

        // instantiate my controller app
        this.homePageController = new HomePageController(this.logger);
        this.articleHomeController = new ArticleHomeController(this.logger);
        this.blogHomeController = new BlogHomeController(this.logger);
        this.planteHomeController = new PlanteHomeController(this.logger);
        this.profileController = new ProfileController(this.logger);

        // connect to my all crontrollers routers attributes
        this.app.use(urlConfig.homePageUrl, this.homePageController.router);
        this.app.use(urlConfig.planteUrl, this.planteHomeController.router);
        this.app.use(urlConfig.articleUrl, this.articleHomeController.router);
        this.app.use(urlConfig.blogUrl, this.blogHomeController.router);
        this.app.use(urlConfig.profileUrl, this.profileController.router);

    }

    public startServer = () => {
        this.app.listen(this.app.get('port'), () =>
            this.logger.info(`app start on port ${this.app.get('port')}`),
        );
    };

}

const app = new Server();
app.startServer();
