import { configureStore } from "@reduxjs/toolkit";
import reducerAnnec from './reducers/anecdoteReducer'
import todoReducer from './reducers/FilterReducer'
import notifcationReducer from './reducers/notificationReducer'
import {pokemonApi} from './services/annecTest'


const store = configureStore({  reducer: {    
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    filter: todoReducer 
    ,  annecdotes: reducerAnnec, 
       notification: notifcationReducer  },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),})


export default store;
