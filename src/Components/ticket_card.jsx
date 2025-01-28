import React from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios';

import Ticket_Header from './ticket_header';
import Reply_Card from './reply_card';

import "../Styles/ticket_card.css";

import withParams from '../Hoc/withParams';
import { setTicketStatus } from '../Redux/Slices/dashboardSlice';
import { setLocation } from '../Redux/Slices/userSlice';
import { BASE_URL } from '../config';

class Ticket_Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketDetails: null, // Initialize as null
            isLoading: false,
            error: null,
        };
    }

    fetchTicketDetails = async () => {
        const { ticketId } = this.props.params;
        const { userId } = this.props;
        //console.log(ticketId) ;
        const ticket_id = ticketId.substring(1); // Assuming ticketId starts with a character to remove
        const url = `${BASE_URL}/ticket/search/${userId}/${ticket_id}`;
        //console.log(url);
        try {
            this.setState({ isLoading: true, error: null });
            const response = await axios.get(url);
            console.log('Search Ticket API Call');
            // Set ticketDetails to response.data.data based on the new structure
            this.setState({ ticketDetails: response.data.data, isLoading: false });
        } catch (error) {
            console.error("Error fetching ticket details:", error);
            this.setState({ error: error.message, isLoading: false });
        }
    };

    async componentDidMount() {
        await this.fetchTicketDetails();
        //console.log("ComponentDidMount calling");
    }

    async componentDidUpdate(prevProps) {
        const { ticketId } = this.props.params;
        const { userId } = this.props;

        if (prevProps.params.ticketId !== ticketId || prevProps.userId !== userId) {
            await this.fetchTicketDetails();
        }
    }

    render() {
        const { ticketDetails, isLoading, error } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>; // Handle errors
        }

        if (!ticketDetails) {
            return <div>No ticket details found</div>;
        }

        const { status, category, createdAt, description, responses } = ticketDetails;
        const userEmail = responses && responses.length > 0 ? responses[0].userEmail : "N/A"; // Get userEmail from responses
        const agentEmail = responses && responses.length > 0 ? responses[0].agentEmail : "N/A"; // Get agentEmail from responses
        const { ticketId } = this.props.params;

        return (
            <>
                <div className="ticket-card">
                    <div className="ticket-header">
                        <Ticket_Header ticketId={ticketId} status={status} />
                    </div>
                    <div className="ticket-info-card">
                        <div className="ticket-details">
                            <div className="ticket-info">
                                <span>
                                    <strong style={{ fontSize: '20px' }}>Subject:</strong>
                                    <span style={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                                        Ticket ID: {ticketId} &bull; Ticket Group: {category}
                                    </span>
                                </span>
                                <span style={{ fontSize: '14px' }}>
                                    Created By: {userEmail} <span style={{ margin: '10px' }}> | </span> {new Date(createdAt).toLocaleString()} 
                                </span>
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
                        < div className="ticket-replies-cards-list">
                            {responses && responses.map((response) => (
                                <Reply_Card
                                    key={response.responseId}
                                    response={response}
                                    senderRole = {response.role} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Ticket_Card));