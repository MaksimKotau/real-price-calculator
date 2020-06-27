import React from 'react';
import MainView from './views/MainView'
import StoreProvider from './state/state'

function App() {
  return (
    <StoreProvider>
      <MainView />
    </StoreProvider>
  );
}

export default App;
