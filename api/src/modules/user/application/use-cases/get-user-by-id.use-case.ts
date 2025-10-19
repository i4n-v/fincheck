import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { DomainException } from 'src/commons/exceptions/domain.exception';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new DomainException(
        GetUserByIdUseCase.name,
        'User not found',
        'ERR_USER_NOT_FOUND',
        404,
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
