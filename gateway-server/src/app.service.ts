import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AppService {
  private authServiceUrl: string;
  private eventServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.authServiceUrl =
      configService.get('AUTH_SERVICE_URL') || 'http://localhost:8001/api';
    this.eventServiceUrl =
      configService.get('EVENT_SERVICE_URL') || 'http://localhost:8002/api';
  }

  checkGatewayHealth(): string {
    return 'Gateway Service Health: OK';
  }

  async checkAuthHealth(): Promise<string> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.authServiceUrl}/`).pipe(
          catchError((error: AxiosError) => {
            throw new Error(`Auth Service Error: ${error.message}`);
          }),
        ),
      );
      return `Auth Service Health: OK - Response: ${data}`;
    } catch (error) {
      return `Auth Service Health: DOWN - Error: ${error.message}`;
    }
  }

  async checkEventHealth(): Promise<string> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.eventServiceUrl}/`).pipe(
          catchError((error: AxiosError) => {
            throw new Error(`Event Service Error: ${error.message}`);
          }),
        ),
      );
      return `Event Service Health: OK - Response: ${data}`;
    } catch (error) {
      return `Event Service Health: DOWN - Error: ${error.message}`;
    }
  }
}
