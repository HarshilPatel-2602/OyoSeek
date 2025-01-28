import React from 'react' 

import Navbar from '../Components/navbar'
import SideNavbar from '../Components/side_navbar'
import TicketList from '../Components/ticket_list'

import "../Styles/ticket_history.css"

class Ticket_History extends React.Component {
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
                        <TicketList/>
                    </div>
                </div>
            </>
        )
    }
}

export default Ticket_History ;