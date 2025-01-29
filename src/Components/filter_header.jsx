import React from "react";
import { connect } from "react-redux";

import { setTicketCategory, resetTicketCategory, setTicketStatus, resetTicketStatus } from "../Redux/Slices/dashboardSlice";

import "../Styles/filter_header.css";

import { setLocation } from "../Redux/Slices/userSlice";
import withLocation from '../Hoc/withLocation';

class Filter_Header extends React.Component {
    constructor(props) {
        super(props);
        const { location } = this.props;
        if (location) {
            const currentPath = location.pathname;
            this.props.setLocation(currentPath);
        }

        // Retrieve showClearFilter from localStorage
        const showClearFilter = localStorage.getItem('showClearFilter') === 'true';

        this.state = {
            showClearFilter: showClearFilter,
        };
    }

    handleGroupingChange = (event) => {
        const selectedValue = event.target.value;
        this.props.setTicketCategory(selectedValue);
        const showClearFilter = selectedValue !== "All";
        this.setState({
            showClearFilter: showClearFilter,
        });
        // Save to localStorage
        localStorage.setItem('showClearFilter', showClearFilter);
    };

    handleStausChange = (event) => {
        const selectedValue = event.target.value;
        this.props.setTicketStatus(selectedValue);
        const showClearFilter = selectedValue !== "All";
        this.setState({
            showClearFilter: showClearFilter,
        });
        // Save to localStorage
        localStorage.setItem('showClearFilter', showClearFilter);
    };

    clearFilter = () => {
        this.props.resetTicketCategory();
        this.props.resetTicketStatus();
        this.setState({
            showClearFilter: false,
        });
        // Save to localStorage
        localStorage.setItem('showClearFilter', false);
    };
    
    componentWillUnmount() {
        localStorage.removeItem('showClearFilter');
    }
    render() {
        const { selectedTicketCategory, selectedTicketStatus, currentLoc } = this.props;
        console.log(currentLoc);
        return (
            <>
                <div className="filter-header">
                    <h2 className="filter-header-text">Tickets</h2>
                    <div className="filter-header-grouping" style={{ display: currentLoc === '/' ? 'none' : '' }}>
                        <select
                            className="dropdown-menu"
                            value={selectedTicketStatus}
                            onChange={this.handleStausChange}
                        >
                            <option value="All">
                                Status
                            </option>
                            <option value="Active">Pending</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                    <div className="filter-header-grouping">
                        <select
                            className="dropdown-menu"
                            value={selectedTicketCategory}
                            onChange={this.handleGroupingChange}
                        >
                            <option value="All">
                                Group by
                            </option>
                            <option value="PreBooking">Pre-Booking</option>
                            <option value="PostBooking">Post-Booking</option>
                        </select>
                    </div>
                    {this.state.showClearFilter && (
                        <button
                            id="clear-filter-btn"
                            className="clear-filter-btn"
                            onClick={this.clearFilter}
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedTicketCategory: state.dashboard.selectedTicketCategory,
    selectedTicketStatus: state.dashboard.selectedTicketStatus,
    currentLoc: state.user.currentLoc,
});

const mapDispatchToProps = {
    setTicketCategory,
    resetTicketCategory,
    setTicketStatus,
    resetTicketStatus,
    setLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(withLocation(Filter_Header));