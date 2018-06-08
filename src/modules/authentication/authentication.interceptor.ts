import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TokenExpiredException } from '../core/external/sso/sso.exceptions';
import { HttpInvalidTokenException } from './invalidToken.exception';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  async intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Promise<Observable<any>> {
    // TODO: It's not getting executed????? :OOOOO
    const httpContext = context.switchToHttp();
    const wsContext = context.switchToWs();

    let token = '';

    // Depending in context, extract token
    if (httpContext) {
      const request = httpContext.getRequest();
      if (!request.headers['authorization']) return call$;
      token = request.headers['authorization'];
    } else if (wsContext) {
      const payload = wsContext.getData();
      if (!payload || !payload.headers || !payload.headers['authorization']) return call$;
      token = payload.headers['authorization'];
    }

    try {
      token = token.slice('Bearer '.length);
      const character = await this.authenticationService.verifyAuthentication(token);

      // Depending in context, set token and character to session
      // TODO: Should we just set things to requestContext instead of attaching it like this?
      if (httpContext) {
        const request = httpContext.getRequest();
        request.token = token;
        request.character = character;
      } else if (wsContext) {
        const client = wsContext.getClient();
        client.token = token;
        client.character = character;
      }

    } catch (error) {
      if (error instanceof TokenExpiredException) throw new HttpInvalidTokenException();
      // If some other error, re-throw
      throw error;
    }

    // If everything okey, continue executing
    return call$;
  }
}
