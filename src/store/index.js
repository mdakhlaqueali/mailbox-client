import {configureStore} from '@reduxjs/toolkit';

import authReducer from './authReducer';
import mailReducer from './mailReducer';

const store = configureStore({
    reducer: {auth:authReducer, mail: mailReducer}
})

export default store;