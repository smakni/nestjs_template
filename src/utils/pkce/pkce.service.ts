import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class PkceService {
    generateState(): string {
        return randomBytes(32).toString('hex');
    }

    generateCodeVerifier(): string {
        const codeVerifier = randomBytes(32).toString('hex');
        return codeVerifier;
    }

    generateCodeChallenge(codeVerifier: string): string {
        const hash = createHash('sha256').update(codeVerifier).digest('base64');
        const codeChallenge = hash
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
        return codeChallenge;
    }
}
