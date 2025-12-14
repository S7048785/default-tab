import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'

import 'virtual:uno.css'
import "./styles/global.less"
import Home from "./home/index.ts.tsx";

(function () {
  const theme = localStorage.getItem('theme') || ''
  try {
    const isDark = JSON.parse(theme).state.isDark
    isDark ? document.documentElement.classList.toggle('dark') : void 0;

  } catch (error) {
    console.error('缺少Theme配置')
  }
})()


function Index() {

  return (
    <StrictMode>
      <Home />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(
  <Index />,
)
