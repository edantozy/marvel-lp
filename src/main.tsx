import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { NextUIProvider } from "@nextui-org/react";
import MarvelLPApp from './MarvelLPApp.tsx'
import './index.css'
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <main className="custom-dark text-foreground bg-background min-h-screen">
          <MarvelLPApp />
        </main>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
