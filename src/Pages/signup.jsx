import React from "react"


import AppLogo from "../Components/app_logo"
import SignupForm from "../Components/signup_form"

import "../Styles/signup.css"

class SignUp extends React.Component {
    render () {
        return (
            <>
                <div className="container">
                    <div className="logo-signup"><AppLogo background_color="#f8f8f8"/></div>
                    <div className="form-signup"><SignupForm/></div>
                </div>
            </>
        )
    }
}
export default SignUp ;