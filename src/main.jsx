import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { AuthContextProvider } from './context/Authcontext'
import { ChatContextProvider } from './context/ChatContext'


ReactDOM.render(
  <AuthContextProvider>
    <ChatContextProvider>
        <React.StrictMode>
          <App/>
        </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
)
