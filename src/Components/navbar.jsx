import React from 'react'
import axios from 'axios'

import { BASE_URL } from '../config'

import "../Styles/navbar.css" 

import App_Logo from './app_logo'
import Add_Ticket_Btn from './add_ticket_btn';
import User_Profile_Info from './user_profile_info';

class Navbar extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            searchTicketId : '',
        }
    }
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (this.state.searchTicketId === '') {
            return ;
        }
        const { searchTicketId } = this.state ;
        try {
            
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    render () {
        const { searchTicketId } = this.state ;
        return (
            <>
                <div className="navbar-container">
                    <div className="left-navbar-container">
                        <button className="navbar-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <rect width="24" height="24" fill="white" />
                                <path d="M3 6h18M3 12h18m-18 6h18" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </button>
                        <div className="logo-container">
                            <App_Logo background_color="white"/>
                        </div>
                        <form className="navbar-search" onSubmit={this.handleSearchSubmit}>
                            <button type="submit" className="navbar-search-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#7d7d7d">
                                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                                </svg>
                            </button>
                            <input 
                                type="text" 
                                name="ticketId"
                                placeholder="Search" 
                                className="navbar-search-input"
                                value={searchTicketId}
                                onChange={this.handleInputChange} 
                            />
                        </form>
                    </div>
                    <div className="right-navbar-container">
                        {this.props.add_ticket && <div className="navbar-add-ticket-btn">
                            <Add_Ticket_Btn/>
                        </div>}
                        <div className="navbar-user-profile-info">
                            <User_Profile_Info/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Navbar ;