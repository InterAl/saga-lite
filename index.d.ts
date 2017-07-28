declare function createSaga(): Saga;

declare interface Saga {
    handle(actionType: string, handler: Handler): void;
    take(actionType: string): Promise<Action>;
    dispatch(action: Action): void;
}

declare interface Handler {
    (action: Action): void;
}

declare interface Action {
    type: string;
    [x: string]: any
}
