import { createStore, applyMiddleware, compose } from 'redux'

import combinedReducer from './combinedReducer'

export default function configureStore (initialState = {}) {
    /**
	 * Apply middleware from routes
	 */
  const middlewares = applyMiddleware()

    /**
	 * Configure store using above middlewares
	 */
  const composeFunc = compose(
        middlewares,
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
            ? window.devToolsExtension()
            : f => f
    )

  const store = createStore(combinedReducer(), initialState, composeFunc)

  return store
}
