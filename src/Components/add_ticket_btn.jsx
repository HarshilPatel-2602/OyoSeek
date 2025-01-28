import React from 'react' 

import "../Styles/add_ticket_btn.css" 

import withNavigate from '../Hoc/withNavigate';

class AddTicketBtn extends React.Component {
    handleClick = () => {
        const { navigate, ticket } = this.props ;
        navigate('/ticket/create') ;
        console.log(ticket) ;
    }
    render () {
        return (
            <>
                <button className="add-ticket-btn" onClick={this.handleClick}>Add Ticket</button>
            </>
        )
    }
}

export default withNavigate(AddTicketBtn) ;