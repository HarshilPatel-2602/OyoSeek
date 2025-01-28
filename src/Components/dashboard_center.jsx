import React from 'react'
import { connect } from 'react-redux'

import Filter_Header from "./filter_header"


import "../Styles/dashboard_center.css"

import withNavigate from '../Hoc/withNavigate'
import withLocation from '../Hoc/withLocation'

import {fetchTicketCount} from "../Redux/Slices/dashboardSlice" 
import { setLocation } from '../Redux/Slices/userSlice'



class Dashboard_Center extends React.Component {
    componentDidMount() {
        const { userId, role, selectedTicketCategory} = this.props ;
        const { location } = this.props;
        if (location) {
            const currentPath = location.pathname;
            setLocation(currentPath) ;
            //console.log(currentPath) ;
        }
        fetchTicketCount({ userId, role, ticketCategory: selectedTicketCategory }) ;
    }

    componentDidUpdate(prevProps) {
        const { userId, role, selectedTicketCategory, fetchTicketCount } = this.props ;

        if (prevProps.selectedTicketCategory !== this.props.selectedTicketCategory) {
            // console.log("Category changed:", this.props.selectedTicketCategory) ;
            fetchTicketCount({ userId, role, ticketCategory: selectedTicketCategory}) ;
        } 
    }

    handleCardClick = () => {
        const { navigate } = this.props;  // Get navigate from props
        navigate('/ticket/search');
    };
    
    render () {
        const { activeTickets, resolvedTickets, loading, error } = this.props;
        return (
            <>
                <div className="dashboard-center-container">
                    <div className="filter-dashboard">
                        <Filter_Header/>
                    </div>
                    <div className="counter-dashboard">
                        <div className="counter-dashboard-category">
                            <div className="counter-dashboard-category-card" id="Pending" onClick={this.handleCardClick}>
                                <div className="counter-dashboard-category-card-header">Pending Tickets</div>
                                <div className="counter-dashboard-category-card-number">
                                    {loading?"Loading":(error?"error":activeTickets)}
                                </div>
                            </div>
                            <div className="counter-dashboard-category-card" id="Resolved" onClick={this.handleCardClick}>
                                <div className="counter-dashboard-category-card-header">Resolved Tickets</div>
                                <div className="counter-dashboard-category-card-number">
                                    {loading?"Loading":(error?"error":resolvedTickets)}
                                </div>
                            </div>
                            <div className="counter-dashboard-category-card" id="Total" onClick={this.handleCardClick}>
                                <div className="counter-dashboard-category-card-header">Total Tickets</div>
                                <div className="counter-dashboard-category-card-number">
                                    {loading?"Loading":(error?"error":activeTickets+resolvedTickets)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    activeTickets: state.dashboard.activeTickets,
    resolvedTickets: state.dashboard.resolvedTickets,
    loading: state.dashboard.loading,
    error: state.dashboard.error,
    selectedTicketCategory: state.dashboard.selectedTicketCategory, 
    userId: state.user.userId, 
    role: state.user.role, 
    currentLoc: state.user.currentLoc,    
});
  
const mapDispatchToProps = (dispatch) => ({
    fetchTicketCount: (payload) => dispatch(fetchTicketCount(payload)),
    setLocation,
});
  
export default connect(mapStateToProps, mapDispatchToProps)(
    withNavigate(withLocation(Dashboard_Center))
);
  