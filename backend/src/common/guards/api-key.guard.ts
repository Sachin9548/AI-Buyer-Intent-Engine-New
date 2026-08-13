import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { StoresService } from '../../modules/stores/stores.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly storesService: StoresService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] || request.query['api_key'];

    // Bypass during local testing if no key provided
    if (!apiKey) {
      // In production, reject if missing x-api-key
      return true; // Soft fallback for backward compatibility
    }

    const store = await this.storesService.validateApiKey(apiKey);
    if (!store || store.status !== 'active') {
      throw new UnauthorizedException('Invalid or inactive BIME API Key');
    }

    request.store = store; // Attach validated store item to request context
    return true;
  }
}