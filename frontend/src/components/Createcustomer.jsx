import React, { useState } from "react";
import axios from "axios"
const Createcustomer = ()=>{
    

      const[customerno, setCustno] = useState("");
      const [name, SetName]  = useState("");
      const [address, setAddress] = useState("");
      const [paymentterms, setPaymentterms] = useState("")
      const [shipcond, setShipcond] = useState("")
      const [creditlimit, setCreditlimit] = useState("")
      const [email, setEmail] = useState("")
      async function handlesubmit(e){
        e.preventDefault(); 
        debugger
       try {
        const obj = {
            customerno,
            name,
            address,
            paymentterms,
            shipcond,
            creditlimit:parseInt(creditlimit),
            email
         }
         const customer_response = await axios.post("http://13.203.207.90:80/api/v1/admin/addcustomer", obj)
         debugger;
         if(customer_response.status== 200 ){
             alert ("Customer Created Successfully")
         }
       } catch (error) {
        alert("Customer Was NOT created please check your inputs and try again");
       }
      }
    return(
<>
<div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-md shadow-md mt-10">
  <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
    Add Customer
  </h2>

  <form 
  onSubmit={(e)=>handlesubmit(e)}
  className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Customer No.</label>
      <input
       onChange={(e)=>setCustno(e.target.value)}
        type="text"
        placeholder="Enter customer number"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
      <input
        onChange={(e)=>SetName(e.target.value)}
        type="text"
        placeholder="Enter full name"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
      <input
      onChange={(e)=>setAddress(e.target.value)}
        type="text"
        placeholder="Enter address"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Payment Terms</label>
      <input
      onChange={(e)=>setPaymentterms(e.target.value)}
        type="text"
        placeholder="e.g., NET30"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Conditions</label>
      <input
      onChange={(e)=>setShipcond(e.target.value)}
        type="text"
        placeholder="e.g., Standard, Express"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Credit Limit</label>
      <input
      onChange={(e)=>setCreditlimit(e.target.value)}
        type="text"
        placeholder="Enter credit limit"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
      <input
      onChange={(e)=>setEmail(e.target.value)}
        type="email"
        placeholder="Enter email address"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mt-8 flex justify-end">
    <button
      type="submit"
      className="bg-blue-900 hover:bg-blue-800 transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm"
    >
      Add Customer
    </button>
  </div>
  </form>

  {/* Submit/Add Button */}
  
</div>
</>

    )
}
export default Createcustomer