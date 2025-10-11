export class UserCreatedEvent {
  static readonly eventName = 'user.created';
  constructor(public readonly userId: string) {}
}
