import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'public')
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
