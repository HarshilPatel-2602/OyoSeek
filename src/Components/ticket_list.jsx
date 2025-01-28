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
            tickets : [] ,
            isLoading : false
        }
    }
    async componentDidMount() {
        //console.log("First Reload fetch tickets") ;
        await this.fetchTickets() ;
    }

    async componentDidUpdate(prevProps) {
        if (
            prevProps.selectedTicketStatus !== this.props.selectedTicketStatus ||
            prevProps.selectedTicketCategory !== this.props.selectedTicketCategory
        ) 
        {
            await this.fetchTickets() ;
            //console.log("Fetched again") ;
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
        // console.log("Params : " + params.category + params.status + params.userId + params.role) ;
        try {
            const response = await axios.get(`${BASE_URL}/ticket/search`, { params });
            //console.log(response.data.data) ;
            this.setState({
                tickets: response.data.data , // Update tickets with API response
                isLoading: false,
            });
            //console.log("Response : " + this.state.tickets) ;
        } catch (error) {
            //console.error("Error fetching tickets:", error);
            this.setState({ isLoading: false }); // Hide loader on error
            //console.log(selectedTicketStatus + selectedTicketCategory) ;
        }
    };
    render () {
        const {currentLoc} = this.props ;
        const {tickets} = this.state ;
        //console.log("Lenght : " + tickets.length) ;
        //console.log("Ticket List : " + tickets) ;
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
                            {console.log(tickets.length)} ;
                            {tickets.length > 0 && (tickets.map((ticket, index) => 
                                (
                                    console.log(ticket) ,
                                    <Ticket_List_Card
                                        key={ticket.id || index} 
                                        ticket={ticket} 
                                        onClick={this.handleClick}
                                    />
                                )))
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