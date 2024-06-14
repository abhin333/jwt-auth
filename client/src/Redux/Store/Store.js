import { configureStore } from '@reduxjs/toolkit'


export const Store = configureStore({ 
    reducer: {} ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    })
})