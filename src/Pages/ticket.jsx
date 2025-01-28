import React from 'react' 

import "../Styles/ticket.css"

import Navbar from '../Components/navbar'
import SideNavbar from '../Components/side_navbar'
import TicketCard from '../Components/ticket_card'

class Ticket extends React.Component {
    render () {
        return (
            <>
                <div className="navbar">
                    <Navbar add_ticket={true}/>
                </div>
                <div className="content">
                    <div className="content-side-navbar">
                        <SideNavbar color={"#5da8da"} btn_background={"#e6f2fd"}/>
                    </div>
                    <div className="content-main">
                        <TicketCard/>
                    </div>
                </div>
            </>
        )
    }
}

export default Ticket ;