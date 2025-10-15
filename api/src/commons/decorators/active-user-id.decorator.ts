import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const ActiveUserId = createParamDecorator<undefined>((_data, ctx) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if (!request.userId) {
    throw new UnauthorizedException();
  }

  return request.userId;
});
