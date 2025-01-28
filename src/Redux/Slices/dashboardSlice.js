import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../Api/axiosInstances'



export const fetchTicketCount = createAsyncThunk(
    'dashboard/fetchTicketCount',
    async ({ userId, role, ticketCategory }, { rejectWithValue }) => 
    {
        try {
            console.log("From Slice" + ticketCategory) ;
            const response = await axiosInstance.get('/ticket/count/search', 
                {
                    params: {
                        userId: userId ,
                        role: role ,
                        category: ticketCategory ,
                    },
                }) ;
                return response.data.data ;
        }     
        catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message) ;
            } 
            else {
                return rejectWithValue('Failed to fetch ticket count') ;
            }
        }
    }
);

const dashboardSlice = createSlice(
{
    name: 'dashboard',
    initialState: 
    {
        activeTickets: 0,
        resolvedTickets: 0,
        loading: false,
        error: null,
        selectedTicketCategory: 'All',
        selectedTicketStatus: 'All',
    },
    reducers: {
        setTicketCategory: (state, action) => {
            state.selectedTicketCategory = action.payload ; 
        },
        resetTicketCategory: (state) => {
            state.selectedTicketCategory = "All" 
        },
        setTicketStatus: (state, action) => {
            state.selectedTicketStatus = action.payload ; 
        },
        resetTicketStatus: (state) => {
            state.selectedTicketStatus = "All" 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTicketCount.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTicketCount.fulfilled, (state, action) => {
            state.loading = false;
            state.activeTickets = action.payload.Active_tickets;
            state.resolvedTickets = action.payload.Resolved_tickets;
        })
        .addCase(fetchTicketCount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setTicketCategory , resetTicketCategory , setTicketStatus , resetTicketStatus } = dashboardSlice.actions ;

export default dashboardSlice.reducer ;