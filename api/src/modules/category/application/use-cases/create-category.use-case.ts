import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { UserCreatedEvent } from 'src/commons/events/user-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { ITransactionType } from '../../domain/enums/transaction-type.enum';
import { defaultCategories } from 'src/commons/constants/defaultCategories';

@Injectable()
export class CreateDefaultCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  @OnEvent(UserCreatedEvent.eventName)
  async execute(event: UserCreatedEvent) {
    const categories = defaultCategories.map(
      (category) =>
        new CategoryEntity(
          category.name,
          category.icon,
          category.type as ITransactionType,
          event.userId,
        ),
    );

    return this.categoryRepository.createMany(categories);
  }
}
