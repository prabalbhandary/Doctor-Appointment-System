import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "antd/dist/reset.css"
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from "react-redux"
import store from "./redux/store"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer position="top-right" theme="colored" />
  </StrictMode>,
)
