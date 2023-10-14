import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as basicAuth from 'express-basic-auth';
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(
        ['/api', '/api-json'],
        basicAuth({
            challenge: true,
            users: {
                ['admin']: 'admin'
            }
        })
    );
    app.use(
        session({
            secret: 'your-secret-key', // Replace this with your own secret key
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false } // Set secure to true if serving over HTTPS
        })
    );
    const config = new DocumentBuilder()
        .setTitle('CREATE API')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const customOptions = {
        swaggerOptions: {
            persistAuthorization: true
        },
        customSiteTitle: 'My API',
        customfavIcon: 'path_to_favicon',
        customJs: './custom-swagger.js'
    };
    SwaggerModule.setup('api', app, document, customOptions);
    await app.listen(3000);
}
bootstrap();
