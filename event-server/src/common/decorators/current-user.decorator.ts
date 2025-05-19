import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtPayload {
  userId: string;
  role: string;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    const id = req.headers['x-user-id'] as string | undefined;
    const role = req.headers['x-user-role'] as string | undefined;
    return { userId: id, role } as JwtPayload;
  },
);
