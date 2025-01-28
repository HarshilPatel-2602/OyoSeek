import React from 'react' 
import { connect } from 'react-redux'
import { BrowserRouter as Router, Routes , Route } from "react-router-dom"

import './App.css'

import Login from './Pages/login'
import Signup from './Pages/signup'
import CreateTicket from './Pages/create_ticket'
import TicketHistory from './Pages/ticket_history'
import Ticket from './Pages/ticket' 
import Dashboard from './Pages/dashboard';

class App extends React.Component {
  render () {
    const isLoggedIn = this.props.userId !== '' ;
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/ticket/search" element={<TicketHistory />} />
                    <Route path="/ticket/search/:ticketId" element={<Ticket />} />
                    <Route path="/ticket/create" element={<CreateTicket/>}/>
                </Routes>
            </div>
        </Router>
    );
  };
}

const mapStateToProps = (state) => ({
  userId : state.user.userId ,
});

export default connect(mapStateToProps)(App) ;