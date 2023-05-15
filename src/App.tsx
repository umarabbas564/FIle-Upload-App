/* @jsxImportSource @emotion/react */
import React from "react";
import Routes from "routes";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import store from "store";
const persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
        <Toaster position="top-center" />
      </PersistGate>
    </Provider>
  );
};

export default App;
