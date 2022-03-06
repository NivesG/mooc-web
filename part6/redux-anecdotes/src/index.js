import React from 'react'
import ReactDOM from 'react-dom'
//import { createStore } from 'redux'
import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdotesreducer from './reducers/anecdoteReducer'
import {addAnecdote} from './reducers/anecdoteReducer'
import { addNotification, removeNotification } from './reducers/reducer'
import notificationSlice from './reducers/reducer'
import filterSlice from './reducers/filterReducer'
import {filterWord} from './reducers/filterReducer'



const reducer = combineReducers({
  anecdotes: anecdotesreducer,
  notifications: notificationSlice,
  filters: filterSlice
})

const store = configureStore({
  reducer
})


console.log("hahaha", store.getState())
store.subscribe(() => console.log(store.getState()))





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)