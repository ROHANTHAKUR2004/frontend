import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    downloadedtickets : [],
    ticketList : [],
    ticketDistribution:{
        open: 0,
        inProgress : 0,
        resolved: 0,
        onHold : 0,
        cancelled : 0
    }
};


export const getallticketsfortheuser = createAsyncThunk('tickets/getallticketfortheuser', async ()=>{
      
    try {
        const response = axiosInstance.get("getMyAssignedTickets" , {

              headers :{
                'x-access-token' : localStorage.getItem('token')
              }

        });
         toast.promise(response ,{
               success : 'sucessfully loaded all the tickets',
               loading : 'Fetching tickets',
               error : 'something went wrong'
         });
         return await response;
    } catch (error) {
        console.log(error);
       
    }
});

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers : {

        filtertickets : (state, action)=>{
            console.log(action.payload);
             let status = action.payload.status.toLowerCase();
            //  if(status =="Onhold") status = "OnHold";
             if(status == "inprogress") status = "inProgress";
             
             state.ticketList = state.downloadedtickets.filter((ticket)=> ticket.status == status); 
        },
        resetticketlist :(state) =>{
            state.ticketList = state.downloadedtickets;
        }

    },
    extraReducers : (builder) =>{
        builder.addCase(getallticketsfortheuser.fulfilled, (state , action)=>{
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
            state.downloadedtickets = action?.payload?.data?.result;
            const tickets = action?.payload?.data?.result;
            state.ticketDistribution ={
                open: 0,
                inProgress : 0,
                resolved: 0,
                onHold : 0,
                cancelled : 0
            };
            tickets.forEach(ticket =>{ 
               state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
            });
        });
    }
});


export const {filtertickets,  resetticketlist} = ticketSlice.actions;

export default ticketSlice.reducer;