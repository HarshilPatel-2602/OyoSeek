import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { BASE_URL } from "../config";

import { setLocation, login } from "../Redux/Slices/userSlice";

import "../Styles/login_form.css";
import withNavigate from "../Hoc/withNavigate";

class Login_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            role: "",
        };
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password, role } = this.state;

        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password,
                role,
            });
            const userId = response.data.data.user_id;
            const Email = response.data.data.email; // Keep this as is
            const Role = response.data.data.role; // Keep this as is
            this.props.login({ userId, email: Email, role: Role }); // Use lowercase 'email' and 'role'
            console.log(userId);
            const { navigate } = this.props;
            navigate('/');
            console.log("Login successful:", response.data);

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    render() {
        const { email, password, role } = this.state;
        return (
            <>
                <div className="login-container">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <h2 className="login-form-welcome">Welcome to OYO SEEK</h2>
                        <input
                            type="text"
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
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={this.handleInputChange}
                            required>
                            <option value="" disabled>Select Your Role</option>
                            <option value="customer">CUSTOMER</option>
                            <option value="agent">AGENT</option>
                        </select>
                        <button type="submit" id="submit">Sign In</button>
                        <a className="login-to-signup" href="/signup">Don't Have an Account? Sign Up</a>
                    </form>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.user.userId,
    role: state.user.role,
    currentLoc: state.user.currentLoc,
});

const mapDispatchToProps = {
    setLocation,
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigate(Login_Form));