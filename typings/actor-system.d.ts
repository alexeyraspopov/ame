declare module ActorSystem {
  export class ActorSystem {
    constructor(dispatcher: MessageDispatcher);
    actorOf(ActorType: typeof Actor, name: ?string): ActorRef;
    spawn(coroutine: AsyncFunction): any;
  }

  export class ActorRef {
    constructor(mailbox: Mailbox);
    tell(message: Message<*>): void;
  }

  export class Actor {
    constructor(system, disposable);
    receive(message: Message<*>): void;
    dispose(): void;
  }

  export class MessageDispatcher {
    constructor(context: ExecutionContext);
    mailboxOf(MailboxType: typeof Mailbox): Mailbox;
    dispatch(message: Message<*>): void;
    [Symbol.asyncIterator](): Mailbox;
  }

  export class Mailbox implements AsyncIterator {
    constructor(context, disposable);
    push(message: Message<*>): void;
    async next(): void;
    throw(): void;
    return(): void;
  }

  export class Message<T> {
    subject: typeof Message<*>;
    content: T;
    constructor(content: T);
  }

  export interface Executor {
    async execute(routines: Array<Function>): void;
  }

  export class ExecutionContext {
    constructor(executor: Executor);
    async execute(routine: Function): any;
  }

  export class AnimationFrameExecutor implements Executor {
    maxDeadline: number;
    constructor(targetFPS: number);
    async execute(routines: Array<Function>): void;
  }

  export class ProcessTickExecutor implements Executor {
    batchSize: number;
    constructor(batchSize: ?number);
    async execute(routines: Array<Function>): void;
  }
}
