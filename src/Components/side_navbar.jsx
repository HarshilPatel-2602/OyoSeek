import React from 'react' 

import "../Styles/side_navbar.css"

class Side_Navbar extends React.Component {
    render () {
        return (
            <>
                <div className="side-navbar">
                    <button className="side-navbar-btn" style={{backgroundColor : this.props.btn_background}}>
                        <div className="side-navbar-btn-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={this.props.color}>
                                <path d="M280-320q17 0 28.5-11.5T320-360q0-17-11.5-28.5T280-400q-17 0-28.5 11.5T240-360q0 17 11.5 28.5T280-320Zm-40-120h80v-200h-80v200Zm160 80h320v-80H400v80Zm0-160h320v-80H400v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/>
                            </svg>
                        </div>
                        <div className="side-navbar-btn-text" style={{color: this.props.color}}>Tickets</div>
                    </button>
                </div>
            </>
        )
    }
}

export default Side_Navbar ;