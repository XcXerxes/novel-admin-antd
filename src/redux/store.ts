import { createStore, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddlewate from 'redux-thunk'

import reducers from './reducers'

const loggerMiddleware = createLogger({predicate: (getState: any, action: any) => process.env.NODE_ENV !== 'production'})

export default createStore(reducers, applyMiddleware(thunkMiddlewate, loggerMiddleware))
