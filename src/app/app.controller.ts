import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(@Req() request): string {
        if (request.session.views) {
            request.session.views++;
            return `You've viewed this page ${request.session.views} times!`;
        } else {
            request.session.views = 1;
            return `Welcome to the session demo. Refresh!`;
        }
    }
}
