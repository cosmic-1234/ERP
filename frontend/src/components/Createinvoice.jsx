import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"
const Createinvoice =()=>{
const SALESNO = useSelector((state)=>state.homepageslice.salesno)
const[finalamount, setAmount] = useState(3)
async function getprice(SALESNO){
    debugger
    try {
        const amount = await axios.get("http://localhost:3000/api/v1/admin/getamount",{params:{orderno: SALESNO}})
        debugger
        if(amount.data){
            return amount.data.amount
        }
        else{
            alert("Something went wrong try after some time")
        } 
    } catch (error) {
        console.log(error);
    }

}

useEffect(()=>{
    
 getprice(SALESNO).then((data)=>{setAmount(data)})


},[SALESNO])
    return(
        <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-md shadow-md mt-10">
  <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
    Create Billing
  </h2>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Billing No.</label>
      <input
        type="text"
        placeholder="Enter billing number"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Order No.</label>
      <input
      readOnly
      value={SALESNO}
        type="text"
        placeholder="Enter sales order number"
        className=" bg-gray-100 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Billing Date</label>
      <input
        type="date"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
      <input
        type="text"
        disabled
        value={finalamount}
        placeholder="Enter amount"
        className="bg-gray-100 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </form>

  {/* Submit Button */}
  <div className="mt-8 flex justify-end">
    <button
      type="submit"
      className="bg-blue-900 hover:bg-blue-800 transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm"
    >
      Create Billing
    </button>
  </div>
</div>
    )
}
export default Createinvoice