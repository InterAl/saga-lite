"use strict";
///<reference path="../index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
function createSaga() {
    var handlers = {};
    var pendingTakes = {};
    return {
        handle: function (actionType, handler) {
            handlers[actionType] = handlers[actionType] || [];
            handlers[actionType].push(handler);
        },
        take: function (actionType) {
            pendingTakes[actionType] = pendingTakes[actionType] || [];
            var promiseResolve;
            var promise = new Promise(function (resolve) {
                promiseResolve = resolve;
            });
            var resolver = function (action) { return promiseResolve(action); };
            pendingTakes[actionType].push(resolver);
            return promise;
        },
        dispatch: function (action) {
            var type = action.type;
            if (!type)
                throw new Error("Cannot dispatch a typeless action");
            var typeHandlers = handlers[type];
            if (typeHandlers) {
                typeHandlers.forEach(function (h) { return setTimeout(function () { return h(action); }, 0); });
            }
            var takes = pendingTakes[type];
            if (takes) {
                takes.forEach(function (t) { return setTimeout(function () { return t(action); }, 0); });
            }
            pendingTakes[type] = [];
        }
    };
}
exports.createSaga = createSaga;
