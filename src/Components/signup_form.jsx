import React from "react" 
import axios from "axios"

import { BASE_URL } from "../config";

import { login } from "../Redux/Slices/userSlice"
import "../Styles/signup_form.css"

class signup_form extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            email: "",
            password: "",
            cnfPassword: "",
            role: "",
        }
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    validatePasswords = () => {
        const { password, cnfPassword } = this.state;
        return password === cnfPassword;
    };    

    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.validatePasswords()) {
            alert("Password and Confirm Password do not match") ;
            return ;
        }
        const { email, password, role } = this.state;

        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password,
                role,
            });
            const userId = response.data.userId ;
            login({userId,email,role}) ;
            console.log("Login successful:", response.data);

        } catch (error) {
            console.error("Login error:", error);
        }
    };
    render() {
        const { email, password , cnfPassword , role } = this.state;
        return (
            <>
                <div className="signup-container">
                    <form onSubmit={this.handleSubmit} className="signup-form">
                        <h2 className="signup-form-welcome">Welcome to OYO SEEK</h2>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={this.handleInputChange}
                            required
                        />
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter Your Password" 
                            value={password}
                            onChange={this.handleInputChange}
                            required
                        />
                        <input 
                            id="cnf-password" 
                            type="password"
                            name="cnfPassword"
                            placeholder="Confirm Your Password"
                            value={cnfPassword}
                            onChange={this.handleInputChange}
                            required
                        />
                        <select 
                            id="role" 
                            name="role" 
                            value={role}
                            onChange={this.handleInputChange}
                            required>
                            <option value="" disabled selected>Select Your Role</option>
                            <option value="customer">CUSTOMER</option>
                            <option value="agent">AGENT</option>
                        </select>
                        <button type="submit" id ="submit">Sign Up</button>
                        <a className="signup-to-login" href="/login">Already Have an Account? Login</a>
                    </form>
                </div>
            </>
        )
    }
}

export default signup_form ;