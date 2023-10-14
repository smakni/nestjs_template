import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(user: any): Promise<string> {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload);
    }

    async validateUser(payload: any): Promise<any> {
        // Validate if the user exists in your database and return the user info.
        // This is just a placeholder. Implement your own logic.
        return { id: payload.sub, username: payload.username };
    }

    async login(user: any): Promise<{ access_token: string }> {
        // Here, 'user' might contain some user-specific data like username or ID.
        const accessToken = await this.generateToken(user);
        return {
            access_token: accessToken
        };
    }
}
