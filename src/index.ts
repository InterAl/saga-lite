///<reference path="../index.d.ts"/>

export function createSaga() {
    const handlers: {[key: string]: Handler[]} = {};
    const pendingTakes: {[key: string]: ((action: Action) => void)[]} = {};

    return {
        handle(actionType: string, handler: Handler): void {
            handlers[actionType] = handlers[actionType] || [];
            handlers[actionType].push(handler);
        },

        take(actionType: string): Promise<Action> {
            pendingTakes[actionType] = pendingTakes[actionType] || [];

            let promiseResolve: (action: Action) => void;

            const promise = new Promise<Action>(resolve => {
                promiseResolve = resolve;
            });

            const resolver = (action: Action): void => promiseResolve(action);

            pendingTakes[actionType].push(resolver);

            return promise;
        },

        dispatch(action: Action): void {
            const type = action.type;
            if (!type)
                throw new Error(`Cannot dispatch a typeless action`);

            const typeHandlers = handlers[type];

            if (typeHandlers) {
                typeHandlers.forEach(h => setTimeout(() => h(action), 0));
            }

            const takes = pendingTakes[type];

            if (takes) {
                takes.forEach(t => setTimeout(() => t(action), 0));
            }

            pendingTakes[type] = [];
        }
    };
}
