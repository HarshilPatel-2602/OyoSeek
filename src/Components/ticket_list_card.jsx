import React from 'react'

import "../Styles/ticket_list_card.css"

import withNavigate from '../Hoc/withNavigate';

class Ticket_List_Card extends React.Component {
    constructor(props){
        super(props) ;
    }

    handleClick = () => {
        const { navigate, ticket } = this.props ;
        navigate(`/ticket/search/${ticket.ticketId}`) ;
        //console.log(ticket) ;
    }
    render () {
        const {ticketId , status , group , agentEmail , createdAt} = this.props.ticket ;
        console.log("Card : " + this.props.ticket) ;
        //console.log("Ticket Card Props : " + ticketId) ;
        return (
            <div className="table-row" onClick={this.handleClick}>
                <div className="table-cell">Ticket ID: {ticketId}</div>
                <div className="table-cell">{status}</div>
                <div className="table-cell">{group}</div>
                <div className="table-cell">{agentEmail}</div>
                <div className="table-cell">{createdAt}</div>
            </div>
        )
    }
}

export default withNavigate(Ticket_List_Card) ;