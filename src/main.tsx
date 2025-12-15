import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css"

import {ThemeProvider} from "@/components/theme/ThemeProvider.tsx";
import App from "@/App.tsx";

function Index() {

  return (
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(
  <Index />,
)
