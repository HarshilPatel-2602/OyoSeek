import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css';

import Login from './Pages/login';
import Signup from './Pages/signup';
import CreateTicket from './Pages/create_ticket';
import TicketHistory from './Pages/ticket_history';
import Ticket from './Pages/ticket';
import Dashboard from './Pages/dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!this.props.userId,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ isLoggedIn: !!this.props.userId });
    }
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ticket/search" element={<TicketHistory />} />
            <Route path="/ticket/search/:ticketId" element={<Ticket />} />
            <Route path="/ticket/create" element={<CreateTicket />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('Redux State:', state);
  return {
    userId: state.user.userId,
  };
};

export default connect(mapStateToProps)(App);
