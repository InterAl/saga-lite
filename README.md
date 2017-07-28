# saga-lite
A simple event bus inspired by redux-saga. Framework agnostic.

# Installation
```shell
$ npm i -S saga-lite
```

# Usage
First, create an instance of the saga in your app root:

```javascript
//saga.js
import {createSaga} from 'saga-lite';

export default createSaga();
```

Now you may import your saga.js module, and handle/dispatch actions:

### Handle an action

```javascript
import saga from './saga.js';

saga.handle('MY_ACTION_TYPE', action => {
    console.log('handling', action);
});
```

### Dispatch an action

```javascript
import saga from './saga.js';

saga.dispatch({
    type: 'MY_ACTION_TYPE',
    myActionParam: 'foo'
});
```
### Wait for an action
You may wait for an action dispatch by using "take":

```javascript
import saga from './saga.js';

saga.handle('MY_ACTION_TYPE', async action => {
    const action2 = await saga.take('MY_ACTION_TYPE_2');
});
```
