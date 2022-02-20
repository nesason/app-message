import './App.scss';
import React from 'react';
import { Container } from 'react-bootstrap'
import Home from './pages/home/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Switch } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import DynamicRoute from './util/dynamicRoute'
import { MessageProvider } from './context/message'

function App() {


  return (
    <AuthProvider>
      <MessageProvider>
      <BrowserRouter>
        <Container className="p-5">
          <Switch>
            {/* <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route  path="/login" component={Login} /> */}
              <DynamicRoute exact path='/' component={Home} authenticated/>
              <DynamicRoute path='/register' component={Register}  guest/>
              <DynamicRoute path='/login' component={Login} guest />
            <Register />
          </Switch>
        </Container>
      </BrowserRouter>
      </MessageProvider>
    </AuthProvider>

  );
}

export default App;
