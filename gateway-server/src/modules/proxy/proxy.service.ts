import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestHeaders } from 'axios';

@Injectable()
export class ProxyService {
  private authServiceUrl: string;
  private eventServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.authServiceUrl =
      configService.get('AUTH_SERVICE_URL') || 'http://localhost:8001';
    this.eventServiceUrl =
      configService.get('EVENT_SERVICE_URL') || 'http://localhost:8002';
  }

  // Auth 서비스로 요청 프록시
  async proxyToAuthService(req: Request) {
    const url = `${this.authServiceUrl}${req.url}`;
    return this.sendRequest(req, url);
  }

  // Event 서비스로 요청 프록시
  async proxyToEventService(req: Request) {
    const url = `${this.eventServiceUrl}${req.url}`;
    return this.sendRequest(req, url);
  }

  // Item 서비스로 요청 프록시
  async proxyToItemService(req: Request) {
    const url = `${this.eventServiceUrl}${req.url}`;
    return this.sendRequest(req, url);
  }

  // RewardRequest 서비스로 요청 프록시
  async proxyToRewardRequestService(req: Request) {
    const url = `${this.eventServiceUrl}${req.url}`;
    return this.sendRequest(req, url);
  }

  // 실제 HTTP 요청 수행
  private async sendRequest(req: Request, url: string) {
    const headers = { ...req.headers } as AxiosRequestHeaders;
    delete headers['content-length'];
    delete headers['host'];

    if ((req as any).user) {
      headers['x-user-id'] = (req as any).user.sub;
      headers['x-user-role'] = (req as any).user.role;
    }

    const response = await firstValueFrom(
      this.httpService.request({
        url,
        method: req.method,
        data: req.body,
        params: req.query,
        headers,
        validateStatus: () => true,
      }),
    );

    return { statusCode: response.status, data: response.data };
  }
}
