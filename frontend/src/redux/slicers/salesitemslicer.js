import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { useDispatch, useSelector } from "react-redux";
// const salesno = useSelector((state)=>state.homepageslice.salesno)
const init = [
    {
        material: "AAAA",
        quantity: "1234",
        unitprice:"5",
        salesorder:"1234",
        disabled: false

    }
]
const salesitemslice = createSlice({
    name: "salesitemslice",
    initialState: init,
    reducers:{
        addsalesitem:(state, action)=>{
          debugger
          const temp1 = {
            material: action.payload.material,
            quantity: action.payload.quantity,
            unitprice: action.payload.unitprice,
            salesorder:action.payload.salesorder,
            disabled:false
        }
        state.push(temp1)
        
           
        },
        editstate:(state, action)=>{
            debugger;
           state[action.payload.index][action.payload.field] = action.payload.value
        }
    }

})
export const {addsalesitem, editstate} = salesitemslice.actions
export default salesitemslice.reducer