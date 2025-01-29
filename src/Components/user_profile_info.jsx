import React from "react";
import { connect } from "react-redux";
import { logout } from "../Redux/Slices/userSlice"; // Assuming you have a logout action
import { persistor } from "../Redux/store" 

import withNavigate from "../Hoc/withNavigate";

import "../Styles/user_profile_info.css";

class User_Profile_Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
        };
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            showDropdown: !prevState.showDropdown,
        }));
    };

    handleLogout = () => {
        logout(); 
        const { navigate } = this.props ;
        navigate('/') ;
        persistor.purge();
    };

    render() {
        const { email } = this.props;
        const { showDropdown } = this.state;

        return (
            <>
                <div className="user-profile-info-container">
                    <h4 className="user-profile-info-username">{email}</h4>
                    <button className="user-profile-info-icon" onClick={this.toggleDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#bcbcbc">
                            <rect width="30" height="30" fill="#f8f8f8" />
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                        </svg>
                    </button>
                    {showDropdown && (
                        <div className="user-profile-dropdown">
                            <button onClick={this.handleLogout} className="dropdown-item">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    email: state.user.email,
    currentLoc: state.user.currentLoc,
});

const mapDispatchToProps = {
    logout, // Map the logout action to props
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigate(User_Profile_Info)) ;