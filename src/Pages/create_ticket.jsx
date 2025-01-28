import React from 'react' 

import Navbar from '../Components/navbar'
import SideNavbar from '../Components/side_navbar'
import CreateTicketForm from '../Components/create_ticket_form'

import "../Styles/create_ticket.css"

class CreateTicket extends React.Component {
    render () {
        return (
            <>
                <div className="navbar">
                    <Navbar add_ticket={false}/>
                </div>
                <div className="content">
                    <div className="content-side-navbar">
                        <SideNavbar color={"black"} btn_background={"white"}/>
                    </div>
                    <div className="content-main">
                        <CreateTicketForm/>
                    </div>
                </div>
            </>
        )
    }
}

export default CreateTicket ;