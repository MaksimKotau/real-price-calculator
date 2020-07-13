import React from 'react';
import MainView from './views/MainView'
import StoreProvider from './state/state'
import Theme from './styles/Theme';

function App() {
  return (
    <StoreProvider>
      <Theme>
        <MainView />
      </Theme>
    </StoreProvider>
  );
}

export default App;
