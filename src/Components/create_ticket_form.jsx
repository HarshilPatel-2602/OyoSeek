import React from 'react';
import { connect } from 'react-redux';

import "../Styles/create_ticket_form.css";

import axios from 'axios';
import { BASE_URL } from '../config';

import { setLocation } from '../Redux/Slices/userSlice';

class Create_Ticket_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      bookingId: "",
      description: "",
      bookingIdEnabled: false,
      validationError: null,
      isSubmitting: false,
    };
  }

  handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    this.setState({
      category: selectedCategory,
      bookingIdEnabled: selectedCategory === "booking_related",
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { bookingId, category, description } = this.state ;
    const { userId } = this.props ;

    if (category === "booking_related" && !bookingId) {
      this.setState({ 
        category : "POSTBOOKING" ,
        validationError: "Booking ID is required for this category." 
      });
      return;
    }
    else {
      this.setState({ 
        category : "PREBOOKING" ,
      });
    }
    try {
      this.setState({ isSubmitting: true, validationError: null });

      if (bookingId) {
        const response = await axios.get(
          `${BASE_URL}/booking/${bookingId}/validate`,
          { params: { userId } }
        );

        if (response.data.isValid) {
          console.log("Validation successful:", response.data);

          // Proceed with form submission (you can add your API call for creating a ticket here)
          console.log("Post-Booking Ticket creation") ;
          await this.createTicket(userId, category, description);
          alert("Validation successful! Proceeding with ticket creation.");
        } else {
          this.setState({ validationError: "Invalid Booking ID. Please try again." });
        }
      } else {
        // If no booking ID is needed, proceed with submission
        console.log("Pre-Booking Ticket creation") ;
        await this.createTicket(userId, category, description);
        alert("Ticket created successfully!");
      }
    } catch (error) {
      console.error("Error validating booking ID:", error);
      this.setState({ validationError: "An error occurred. Please try again." });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };
  // Function to create the ticket
createTicket = async (userId, category, description) => {
  console.log("Hi") ;
  try {
    const response = await axios.post(
      `${BASE_URL}/ticket`,
      { description }, // Send description in the body
      { params: { userId, category } } // Send userId and category as query parameters
    );
    console.log("Ticket created successfully:", response.data);
    alert("Ticket created successfully!");
  } catch (error) {
    console.error("Error creating ticket:", error);
    alert("An error occurred while creating the ticket. Please try again.");
  }
};
  render () {
    const { category, bookingId, description, bookingIdEnabled, validationError, isSubmitting } = this.state ;
  return (
    <>
      <div className="add-ticket-form">
        <h2 className="add-ticket-form-header">Create Ticket</h2>
        <form id="myForm" onSubmit={this.handleSubmit}>
          <div className="add-ticket-form-group">
            <label htmlFor="category" className="add-ticket-form-label">
              Ticket Category:
            </label>
            <select
              id="category"
              name="category"
              className="add-ticket-form-select"
              value={category}
              onChange={this.handleCategoryChange}
            >
              <option value="" disabled selected>
                Select ticket category
              </option>
              <option value="miscellaneous">Miscellaneous</option>
              <option value="booking_related">Booking Related</option>
            </select>
          </div>
          <div className="add-ticket-form-group">
            <label htmlFor="bookingId" className="add-ticket-form-label">
              Booking ID:
            </label>
            <input
              type="text"
              id="bookingId"
              name="bookingId"
              className="add-ticket-form-input"
              disabled={!bookingIdEnabled}
              value={bookingId}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="add-ticket-form-group">
            <label htmlFor="description" className="add-ticket-form-label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="add-ticket-form-textarea"
              value={description}
              onChange={this.handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="add-ticket-form-button" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId, 
  email: state.user.email,
  role: state.user.role, 
  currentLoc: state.user.currentLoc,    
});

const mapDispatchToProps = (dispatch) => ({
  setLocation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Create_Ticket_Form);
