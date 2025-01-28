import React from 'react' 
import { connect } from 'react-redux';
import axios from 'axios'

import Ticket_Header from './ticket_header';
import Reply_Card from './reply_card';

import "../Styles/ticket_card.css"

import withParams from '../Hoc/withParams';
import { setTicketStatus } from '../Redux/Slices/dashboardSlice';
import {  setLocation } from '../Redux/Slices/userSlice';
import { BASE_URL } from '../config';

class Ticket_Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketDetails: {
                ticketId : 8906258673 ,
                category : this.props.selectedTicketCategory ,
                status: 'Pending',
                createdAt : "January 08, 2025 at 5:28:48 PM" ,
                description : "I am new joiner and I need vpn to access.Email :- patel.harshil@oyorooms.com Laptop serial number :- FVFH8220Q05N" ,
                responses : [
                    {
                        "responseId": 8,
                        "ticketId": 8906258673,
                        "responseText": "Dear Patel Harshil,Your request for IT Support, Network (VPN), New Tech VPN Request, -- has been resolved Description:I am new joiner and I need VPN to access. Email: patel.harshil@oyorooms.com Laptop serial number: FVFH8220Q05N",
                        "role": "CUSTOMER",
                        "userEmail": "user@example1.com",
                        "agentEmail": "agent@example.com",
                        "responseTime": "2025-01-27T16:27:34.731"
                    }
                ]
            }, 
            isLoading: false,
            error: null,
        };
    }
    fetchTicketDetails = async () => {
        const { ticketId } = this.props.params ;
        const { userId } = this.props ; 
        const url = `${BASE_URL}/ticket/search/${userId}/${ticketId}` ;

        try {
            this.setState({ isLoading: true, error: null }) ;
            const response = await axios.get(url) ;
            this.setState({ ticketDetails: response.data, isLoading: false }) ;
        } catch (error) {
            console.error("Error fetching ticket details:", error) ;
            this.setState({ error: error.message, isLoading: false }) ;
        }
    };

    componentDidMount() {
        this.fetchTicketDetails() ;
    }

    componentDidUpdate(prevProps) {
        const { ticketId } = this.props.params;
        const { userId } = this.props;

        if (
            prevProps.params.ticketId !== ticketId || 
            prevProps.userId !== userId
        ) {
            this.fetchTicketDetails(); 
        }
    }
    render () {
        const { ticketDetails, isLoading, error } = this.state;
        
        if (isLoading) {
            return <div>Loading...</div>;
        }
        
        // if (error) {
        //     return <div>Error: {error}</div>;
        // }
        
        if (!ticketDetails) {
            return <div>No ticket details found</div>;
        }
        const { status, category , email , description , createdAt , responses } = ticketDetails;
        const { ticketId } = this.props.params; // Access ticketId from params prop
        console.log("Ticket ID:", ticketId);
        return (
            <>
                <div className="ticket-card">
                    <div className="ticket-header">
                        <Ticket_Header ticketId = {ticketId} status = {status}/>
                    </div>
                    <div className="ticket-info-card">
                        <div className="ticket-details">
                            <div className="ticket-info">
                                <span><strong style={{fontSize : '20px'}}>Subject:</strong><span style={{marginLeft : '10px' , fontSize : '16px' , fontWeight : 'bold'}}>Ticket ID: {ticketId} &bull; Ticket Group: {category}</span></span>
                                <span style={{fontSize : '14px'}}>Created By: {email} <span style={{margin: '10px'}}> | </span> {createdAt} </span>
                            </div>
                            <div className="ticket-status">
                                <strong>Status:</strong> <span>{status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-description-card">
                        <h2 className="ticket-description-card-header">Description :</h2>
                        <p className="ticket-description-card-info">
                            {description}
                        </p>
                    </div>
                    <div className="ticket-replies-cards">
                        <h2 className="ticket-replies-cards-header">Activities :</h2>
                        <div className="ticket-replies-cards-list">
                            {responses.length > 0 && (
                                responses.map((response) => (
                                <Reply_Card
                                    key={response.responseId}
                                    response = {response} 
                                />
                            )))}
                            {/* <Reply_Card 
                                key={responses[0].responseId}
                                response = {responses[0]} 
                            /> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.dashboard.loading,
    error: state.dashboard.error,
    selectedTicketCategory: state.dashboard.selectedTicketCategory, 
    selectedTicketStatus: state.dashboard.selectedTicketStatus,
    userId: state.user.userId, 
    email: state.user.email,
    role: state.user.role, 
    currentLoc: state.user.currentLoc,    
});
  
const mapDispatchToProps = (dispatch) => ({
    setTicketStatus,
    setLocation,
});

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Ticket_Card)) ;