import { createSlice } from "@reduxjs/toolkit";

const homepageslice = createSlice({
    name: "homepageslice",
    initialState:{
        salesno: "",
        custno: "",
        deldate: "",
        orderdate: "",
        shipaddress: "",
        shipcondition:"",
        payterms:""
    },
    reducers:{
     setsalesno: (state, action)=>{
       state.salesno = action.payload
     },
     setcustno: (state, action)=>{
      state.custno = action.payload
    },
    setdeldate: (state, action)=>{
      state.deldate = action.payload
    },
    setorderdate: (state, action)=>{
      state.orderdate = action.payload
    },
    setshipcondition: (state, action)=>{
      state.shipcondition = action.payload
    },
    setpayterm: (state, action)=>{
      state.payterms = action.payload
    },
      setshipaddress: (state, action)=>{
      state.shipaddress = action.payload
    }
    }
})
export const {setorderdate, setcustno, setdeldate, setsalesno, setshipaddress, setshipcondition, setpayterm} = homepageslice.actions
export default homepageslice.reducer