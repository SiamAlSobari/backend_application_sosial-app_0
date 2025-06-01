import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()

export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP')
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();
        const handleMethod = context.getHandler().name

        this.logger.log(`${method} ${url} REQUEST KE METHOD ${handleMethod}`);

        return next.handle().pipe(
            tap(()=>{
                const delay = Date.now() - now;
                this.logger.log(`[${method}] ${url} - METHOD ${handleMethod} - SELESAI DALAM ${delay}ms`)
            })
        )
    }
}