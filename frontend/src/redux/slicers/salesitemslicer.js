import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { useDispatch, useSelector } from "react-redux";
// const salesno = useSelector((state)=>state.homepageslice.salesno)
const init = [
    {
        material: "",
        quantity: "",
        unitprice:"",
        salesorder:"",
        disabled: false,
        firstload: true

    }
]
const salesitemslice = createSlice({
    name: "salesitemslice",
    initialState: init,
    reducers:{
        addsalesitem:(state, action)=>{
            console.log("add")
             const arr = [...state];
             if(arr.length ===1 && arr[0]["firstload"]){
                arr[0]["salesorder"] = action.payload
                arr[0]["firstload"] = false;
                
                state = arr
             }
            else{
          const temp1 = {
            material: action.payload.material,
            quantity: action.payload.quantity,
            unitprice: action.payload.unitprice,
            salesorder:action.payload.salesorder,
            disabled:false,
            firstload:false
        }
        
        state.push(temp1)
    }
           
        },
        editstate:(state, action)=>{
            console.log("edit")
           state[action.payload.index][action.payload.field] = action.payload.value
        },
        
    }

})
export const {addsalesitem, editstate} = salesitemslice.actions
export default salesitemslice.reducer