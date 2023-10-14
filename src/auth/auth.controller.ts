import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PkceService } from 'src/utils/pkce/pkce.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(
        @Req() request,
        @Body() loginUserDto: LoginUserDto
    ): Promise<{ access_token: string }> {
        // Validate the user with your logic (e.g., check password, etc.)
        // For this example, I'm assuming the user is valid.
        const user = { id: 1, username: loginUserDto.username }; // This is just a placeholder. Implement your own logic.
        request.session.user = user; // This will set a session cookie with the user object
        return this.authService.login(user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getProtectedRoute(@Request() req) {
        // You can access the user object attached to the request after JWT validation
        // This is added by the JwtStrategy's validate method
        const user = req.session.user;
        return `This route is protected! Welcome ${user.username}`;
    }
}
