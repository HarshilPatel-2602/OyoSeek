import React from 'react' 
import {connect} from 'react-redux'
import axios from 'axios'

import "../Styles/ticket_list.css"

import { BASE_URL } from '../config'
import Ticket_List_Card from './ticket_list_card'
import Filter_Header from './filter_header'

import { setLocation } from "../Redux/Slices/userSlice" ;
import withLocation from '../Hoc/withLocation'
import withNavigate from '../Hoc/withNavigate'

class Ticket_List extends React.Component {
    constructor(props) {
        super(props) ;
        const { location } = this.props;
        if (location) {
            const currentPath = location.pathname ;
            this.props.setLocation(currentPath) ;
        }
        this.state = {
            tickets : [
                {
                    ticketId : 8906258673 , 
                    status : this.props.selectedTicketStatus ,
                    group : this.props.selectedTicketCategory , 
                    agentEmail : "amiydubey.wv@oyorooms.com" ,
                    createdAt : "15 days ago"
                }
            ] ,
            isLoading : false
        }
    }
    componentDidMount() {
        this.fetchTickets() ;
        console.log("First Reload fetch tickets") ;
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.selectedTicketStatus !== this.props.selectedTicketStatus ||
            prevProps.selectedTicketCategory !== this.props.selectedTicketCategory
        ) {
            this.fetchTickets() ;
            console.log("Fetched again") ;
        }
    }

    fetchTickets = async () => {
        this.setState({ isLoading: true }); 
        const { userId , role , selectedTicketStatus, selectedTicketCategory } = this.props ; 
        const params = {
            userId : userId ,
            role : role ,
            status: selectedTicketStatus || "ALL",
            category: selectedTicketCategory || "ALL",
        };
        try {
            const response = await axios.get(`${BASE_URL}/ticket/search`, { params }); // Pass query params
            this.setState({
                tickets: response.data || [], // Update tickets with API response
                isLoading: false,
            });
        } catch (error) {
            console.error("Error fetching tickets:", error);
            this.setState({ isLoading: false }); // Hide loader on error
            console.log(selectedTicketStatus + selectedTicketCategory) ;
        }
    };
    render () {
        const {currentPath} = this.props ;
        console.log("Ticket List : " + currentPath) ;
        return (
            <>
                <div className="ticket-list">
                    <div className="ticket-list-container">
                        <Filter_Header/>
                    </div>
                    <div className="table-container">
                        <div className="table-row header">
                            <div className="table-cell">SUBJECT</div>
                            <div className="table-cell">STATUS</div>
                            <div className="table-cell">GROUP</div>
                            <div className="table-cell">ASSIGNED TO</div>
                            <div className="table-cell">ADDED</div>
                        </div>
                            {this.state.tickets.map((ticket, index) => 
                                (
                                    <Ticket_List_Card
                                        key={ticket.id || index} 
                                        ticket={ticket} 
                                        onClick={this.handleClick}
                                    />
                                ))
                            }
                            {/* <Ticket_List_Card
                                    key={this.state.tickets[0].ticketId} 
                                    ticket={this.state.tickets[0]} 
                                    onClick={this.handleClick}
                            /> */}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userId : state.user.userId,
    role : state.user.role,
    selectedTicketCategory : state.dashboard.selectedTicketCategory,
    selectedTicketStatus : state.dashboard.selectedTicketStatus,
    currentLoc : state.user.currentLoc,
  });
  
  const mapDispatchToProps = {
    setLocation,
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(withLocation(Ticket_List));