import React from 'react' 
import axios from 'axios'
import { connect } from 'react-redux';

import "../Styles/reply_card.css" 
import { BASE_URL } from '../config';

class Reply_Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false,
            isEditing: false,
            updatedResponseText: this.props.response.responseText
        };
    }
    toggleDropdown = () => {
        this.setState({ dropdownVisible: !this.state.dropdownVisible });
    };

    handleOptionClick = async (option) => {
        const { ticketId , responseId } = this.props.response ;
        const { userId , role , sendeRole } = this.props ;
        if (option === "Delete") {
            const { role } = this.props ;
            if(role !== 'AGENT' || sendeRole !== role) return ;
            try {
                    const response = await axios.delete(
                    `${BASE_URL}/ticket/${ticketId}/response/${responseId}`, 
                    {
                        params: { userId }, 
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
    
                if (response.status === 200) 
                {
                    console.log("Delete successful!") ;
                } 
                else 
                {
                    console.error("Failed to delete:", response.data) ;
                }
            } catch (error) {
                console.error("Error while deleting:", error.response?.data || error.message);
            }
        } 
        else 
        {
            console.log("Role of user :  " + role) ;
            if(role === 'CUSTOMER' || sendeRole !== role) return ;

            this.setState({ isEditing: true });
        }
    };
    handleUpdateSubmit = async () => {
        const { ticketId, responseId } = this.props.response;
        const { userId } = this.props;
        const { updatedResponseText } = this.state;
    
        console.log("Updating response with data:", {
            ticketId,
            responseId,
            updatedText: updatedResponseText,
            userId,
        });
    
        try {
            const response = await axios.put(
                `${BASE_URL}/ticket-response/${ticketId}/response/${responseId}`,
                { 
                    updatedText: updatedResponseText 
                },
                {
                    params: { userId },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (response.status === 200) {
                console.log("Update successful!");
                this.setState({ isEditing: false });
            } else {
                console.error("Failed to update:", response.data);
            }
        } catch (error) {
            console.error("Error while updating:", error.response?.data || error.message);
        }
    };

    handleInputChange = (event) => {
        this.setState({ updatedResponseText: event.target.value });
    };
    render () {
        const { responseText , role , userEmail , agentEmail , responseTime } = this.props.response ;
        const { email } = this.props ;
        const { dropdownVisible , isEditing , updatedResponseText } = this.state;
        //console.log("Email : " + email) ;
        return (
            <>
                <div className="card" style={{backgroundColor : userEmail === email ? '#E6F7E6' : 'white'}}>
                    <div className="card-header">
                        <div className="header-info">
                            <div className="header-info-left">
                                <div className="header-info-profile-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#bcbcbc">
                                        <rect width="30" height="30" fill="#f8f8f8" />
                                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                    </svg>
                                </div>
                                <h4 className="header-info-profile-username">{role === 'AGENT' ? agentEmail : userEmail}</h4>
                            </div>
                            <div className="header-info-center">
                                <div className="header-info-profile-reciever">
                                    <p className="email">To: {role !== 'AGENT' ? agentEmail : userEmail}</p>
                                    <p className="time">{responseTime}</p>
                                </div>
                            </div>
                            <div className="header-info-right">
                                <button className="dropdown-toggle" onClick={this.toggleDropdown}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                                    </svg>
                                </button>
                                {dropdownVisible && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => this.handleOptionClick("Update")}>
                                            Update Reply
                                        </div>
                                        <div className="dropdown-item" onClick={() => this.handleOptionClick("Delete")}>
                                            Delete Reply
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {!isEditing ? (
                            responseText
                            ) : (
                            <div>
                                <textarea
                                    value={updatedResponseText}
                                    onChange={this.handleInputChange}
                                    className="update-textarea"
                                    placeholder="Edit your response..."
                                />
                                <button onClick={this.handleUpdateSubmit} className="update-submit-btn">
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userId : state.user.userId,
    role : state.user.role,
    email : state.user.email,
    role : state.user.role,
    currentLoc : state.user.currentLoc,
});

export default connect(mapStateToProps)(Reply_Card) ;