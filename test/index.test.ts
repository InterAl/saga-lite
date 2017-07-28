import {createSaga} from '../src/index';
import * as sinon from 'sinon';
import {assert} from 'chai';
import * as waitFor from 'wait-for-cond';

describe('saga-lite', () => {
    it('handle an event', () => {
        //Given
        const {dispatch, handle} = createSaga();
        const handlerMock = sinon.mock();

        handlerMock.withArgs({
            type: 'MY_ACTION_TYPE',
            actionArg1: 'foo',
            actionArg2: 'bar'
        });

        handle('MY_ACTION_TYPE', handlerMock);

        //When
        dispatch({
            type: 'MY_ACTION_TYPE',
            actionArg1: 'foo',
            actionArg2: 'bar'
        });

        //Then
        return waitFor.assert(() => {
            handlerMock.verify();
        }, 1000);
    });

    it('handler can take (wait for) an event', () => {
        //Given
        const {dispatch, handle, take} = createSaga();

        const takeSuccess = sinon.mock();

        takeSuccess.withArgs({
            type: 'MY_ACTION_TYPE_2',
            arg1: 'foo'
        });

        handle('MY_ACTION_TYPE', async action => {
            const action2 = await take('MY_ACTION_TYPE_2');
            takeSuccess(action2);
        });

        //When
        dispatch({
            type: 'MY_ACTION_TYPE',
            actionArg1: 'foo',
            actionArg2: 'bar'
        });

        setTimeout(() => {
            dispatch({
                type: 'MY_ACTION_TYPE_2',
                arg1: 'foo'
            });
        }, 1);

        //Then
        return waitFor.assert(() => {
            takeSuccess.verify();
        }, 1000);
    });
});
