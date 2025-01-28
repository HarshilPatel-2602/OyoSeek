import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { BASE_URL } from '../config';
import "../Styles/ticket_header.css";
import { setLocation } from '../Redux/Slices/userSlice';

class Ticket_Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDescriptionField: false,
            description: "",
        };
    }

    handleReplyClick = () => {
        const { status } = this.props;
        if (status !== 'ACTIVE') return;
        this.setState({ showDescriptionField: true });
    }

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }

    handleSubmitReply = async () => {
        const { ticketId, userId, role } = this.props;
        const { description } = this.state;
    
        if (!description.trim()) {
            alert("Description cannot be empty!");
            return;
        }
    
        // Prepare the data to be sent
        const replyData = {
            userId,
            role,
            replyData: { responseText: description }
        };
        console.log("Submitting reply with data:", replyData); // Log the data being sent
    
        try {
            const response = await axios.post(
                `${BASE_URL}/ticket-response/${ticketId}`,
                replyData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (response.status === 200) {
                console.log("Reply submitted successfully!");
                this.setState({ showDescriptionField: false, description: "" });
            } else {
                console.error("Failed to submit reply:", response.data);
            }
        } catch (error) {
            // Log the full error response
            console.error("Error while submitting reply:", error.response ? error.response.data : error.message);
        }
    }

    handleMarkResolvedClick = async () => {
        const { role, status } = this.props;
        if (role !== 'AGENT' || status !== 'ACTIVE') return;
        const { ticketId, userId } = this.props;
        try {
            const response = await axios.put(
                `${BASE_URL}/ticket/${ticketId}/update-status`,
                {},
                {
                    params: { userId },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("Ticket status updated successfully!");
            } else {
                console.error("Failed to update ticket status:", response.data);
            }
        } catch (error) {
            console.error("Error while updating ticket status:", error.response?.data || error.message);
        }
    }

    render() {
        const { status } = this.props;
        const { showDescriptionField, description } = this.state;
        return (
            <>
                <div className="ticket-header-buttons">
                    <button className="ticket-header-buttons-reply" onClick={this.handleReplyClick} disabled={status !== 'ACTIVE'}>
                        <div className="ticket-header-buttons-reply-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#00796B">
                                <path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z" />
                            </svg>
                        </div>
                        <h2 className="ticket-header-buttons-reply-text">Reply</h2>
                    </button>
                    <button className="ticket-header-buttons-markResolved" onClick={this.handleMarkResolvedClick}>
                        <div className="ticket-header-buttons-markResolved-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#00796B">
                                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                            </svg>
                        </div>
                        <h2 className="ticket-header-buttons-markResolve-text">Mark as Resolved</h2>
                    </button>
                </div>
                {showDescriptionField && (
                    <div className="reply-input-container">
                        <textarea
                            className="reply-input"
                            placeholder="Enter your reply..."
                            value={description}
                            onChange={this.handleDescriptionChange}
                        />
                        <button className="submit-reply-btn" onClick={this.handleSubmitReply}>
                            Submit Reply
                        </button>
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.user.userId,
    email: state.user.email,
    role: state.user.role,
    currentLoc: state.user.currentLoc,
});

const mapDispatchToProps = (dispatch) => ({
    setLocation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ticket_Header);