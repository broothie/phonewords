import ReactDOM from 'react-dom/client'
import React from "react"
import App from './components/App'

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root')
    ReactDOM.createRoot(root).render(<App />)
})
