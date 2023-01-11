import AdminJS, { Login } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminSequelize from '@adminjs/sequelize'
import AdminMongoose from '@adminjs/mongoose'
import express, { request } from 'express'

//Models
import {Role} from './models/role.entity';
import {User} from './models/user.entity';
import {Document} from './models/document.entity';

//Controllers
import UserController from './controllers/UserController'

//Routes
import document from './routes/document';
import auth from './routes/auth';

import session from 'express-session'
import cors from 'cors';

require('dotenv').config()

const bcrypt = require("bcryptjs")
const mysqlStore = require('express-mysql-session')(session);

const PORT = 3001

const sessionStore = new mysqlStore({
    connectionLimit: 10,
    password: process.env.SQL_DB_PASS,
    User:  process.env.SQL_DB_USER ,
    database:  process.env.SQL_DB_NAME ,
    host:  process.env.SQL_DB_HOST ,
    port:  process.env.SQL_DB_PORT ,
    createDatabaseTable:true
})

AdminJS.registerAdapter({
    Resource: AdminSequelize.Resource,
    Database: AdminSequelize.Database
})

AdminJS.registerAdapter({
    Resource: AdminMongoose.Resource,
    Database: AdminMongoose.Database
})

const generateResource = (Model: object, properties: any={}, actions: any = {}) => {
    return {
            resource: Model,
            options: {
                properties: {
                    ...properties,
                    createdAt: {
                        isVisible: {
                            list: true, edit: false, create: false, show: true
                        }
                    },
                    updatedAt: {
                        isVisible: {
                            list: true, edit: false, create: false, show: true
                        }
                    }
                },
                actions: {
                    ...actions
                }
            }
        }
};

const start = async () => {
    const app = express()

    const adminOptions = {
        resources: [
            generateResource(Role),
            generateResource(
                User, 
                {
                password: {
                    type: 'password'
                }
            },
            {
                new: {
                    before: async(request: any, context: any) => {
                            if(request.payload.password){
                                request.payload.password = await bcrypt.hashSync(request.payload.password, 10)
                            }
                            return request;
                    },
                    after: async(originalResponse: any, request: any, context: any) => {
                        console.log('hey,depois')
                       // TODO: Enviar email com acesso ao usuario
                        console.log(originalResponse.record.params)
                        return originalResponse;
                    },
                }
                
            }
            //TODO: Add edit
            ),
            generateResource(Document)
        ],
        dashboard: {
            component: AdminJS.bundle('./components/DashboardComponent')
        },
        //rootPath: '/internal/admin',
        branding: {
            companyName: 'Documentos online',
            logo: 'https://t.ctcdn.com.br/GGIhhvCY9mOQzKN5x-NvdfpKfp4=/512x288/smart/filters:format(webp)/i556355.jpeg',
            favicon: 'https://cdn-icons-png.flaticon.com/512/270/270006.png'
        }
    }

    const admin = new AdminJS(adminOptions)

    //const adminRouter = AdminJSExpress.buildRouter(admin)

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin, 
        {
            authenticate: async (email, password) => {
                const userCTRL = new UserController()
                return await userCTRL.login(email, password)
            },
            cookieName: 'adminjs-internal-admin',
            cookiePassword: 'euj184*b!7Qv$*eGGyBpr%V7ZlVw@nZ3'
        },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret:'2uS:YhKo#,P$HB_^upY#Mp"R,sFOw7K2w0_{JE$|"rtVKF+B6Sb=^Y3h0Znq`rq',
            cookie:{
                httpOnly: process.env.NOD_ENV !== 'production',
                secure:  process.env.NOD_ENV === 'production'
            },
            name: 'adminjs-internal-admin'
        }
    )
    app.use(cors());
    app.use(express.json());

    app.use(admin.options.rootPath, adminRouter);
    app.use('/document', document);
    app.use('/document', auth);

    app.get('/', (req, res) => {
        res.send('Api is running');
    })

    app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
    })
}

start();