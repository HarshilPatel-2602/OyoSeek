import React from "react" ;

import "../Styles/app_logo.css" 

import withNavigate from "../Hoc/withNavigate";

class AppLogo extends React.Component {
    handleClick = () => {
        const { navigate } = this.props ;
        navigate('/') ;
        console.log("Hi") ;
    }
    render() {
        return (
            <>
                <div className="logo-container" style={{display: 'flex',backgroundColor: this.props.background_color}} onClick={this.handleClick}>
                    <h1 className="app-logo-name-OYO">OYO</h1>
                    <h1 className="app-logo-name-partition">|</h1>
                    <h1 className="app-logo-name-SEEK">SEEK</h1>
                </div>
            </>
        )
    }
}

export default withNavigate(AppLogo) ;