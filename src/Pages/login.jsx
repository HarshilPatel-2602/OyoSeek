import React from "react" ;

import AppLogo from "../Components/app_logo"
import LoginForm from "../Components/login_form"

import "../Styles/login.css"

class Login extends React.Component {
    render () {
        return (
            <>
                <div className="container">
                    <div className="logo-login"><AppLogo background_color="#f8f8f8"/></div>
                    <div className="form-login"><LoginForm/></div>
                </div>
            </>
        )
    }
}

export default Login ;