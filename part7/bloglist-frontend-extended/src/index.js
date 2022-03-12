import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
  },
})

console.log(store.getState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
