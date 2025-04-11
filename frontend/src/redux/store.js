import { configureStore } from "@reduxjs/toolkit";
import homepagereducer from "./slicers/homepageslice"
import { persistStore, persistReducer } from "redux-persist";
import salesitemreducer from "./slicers/salesitemslicer"
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root", // Name of the key in the storage
    storage, // Use localStorage for persistence
    whitelist: ["homepageslice"], // Define which slices to persist
  };
  
  // Wrap the reducers with persistReducer
  const rootReducer = combineReducers({
    homepageslice: homepagereducer,
    salesitemslice: salesitemreducer,
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  // Create the Redux store with the persisted reducer
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"], // Ignore the persistence actions
          ignoredPaths: ["register"], // Optionally ignore specific paths in state
        },
      }),
  });
  const persistor = persistStore(store); // Create the persistor to manage the persistence
  
  export { store, persistor }; // Export store and persistor