import React, { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
const Createcustomer = ()=>{
   

      const[customerno, setCustno] = useState("");
      const [name, SetName]  = useState("");
      const [address, setAddress] = useState("");
      const [paymentterms, setPaymentterms] = useState("")
      const [shipcond, setShipcond] = useState("")
      const [creditlimit, setCreditlimit] = useState("")
      const [email, setEmail] = useState("")
      const [verified, setVerified]=useState(false)
      const [otpsend, setOtpsend]= useState(false);
      const [otp, setOtp] = useState("")
      useEffect(()=>{

      },[verified, otpsend])
      async function handlesubmit(e){
        e.preventDefault(); 
        
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
        console.log(error)
        alert("Customer Was NOT created please check your inputs and try again");
       }
      }
      return (
        <>
          <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-md shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
              Add Customer
            </h2>
      
            <form
              onSubmit={(e) => handlesubmit(e)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer No.
                </label>
                <input
                  onChange={(e) => setCustno(e.target.value)}
                  type="text"
                  placeholder="Enter customer number"
                  className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  onChange={(e) => SetName(e.target.value)}
                  type="text"
                  placeholder="Enter full name"
                  className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Enter address"
                  className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms
                </label>
                <input
                  onChange={(e) => setPaymentterms(e.target.value)}
                  type="text"
                  placeholder="e.g., NET30"
                  className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Conditions
                </label>
                <input
                  onChange={(e) => setShipcond(e.target.value)}
                  type="text"
                  placeholder="e.g., Standard, Express"
                  className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Limit
                </label>
                <input
                  onChange={(e) => setCreditlimit(e.target.value)}
                  type="text"
                  placeholder="Enter credit limit"
                  className="w-full sm:w-72 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              {/* 📧 Email + OTP Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter email"
                    className="w-30flex-1 sm:w-72 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {email.trim() && !otpsend && (
                    <button
                      type="button"
                      onClick={() => handleVerifyEmail(email)}
                      className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                    >
                      Send OTP
                    </button>
                  )}
                </div>
      
                {otpsend && (
                  <div className="mt-3 w-30">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                      <input
                        type="text"
                        placeholder="OTP"
                        className="flex-1 sm:w-72 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onChange={(e)=>setOtp(e.target.value)} // Replace with real OTP logic
                      />
                      <button
                        type="button"
                        onClick={() => handlesubmitotp(otp)} // Replace with real verify logic
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                      >
                        Verify
                      </button>
                    </div>
      
                    {verified && (
                      <p className="text-green-600 text-sm font-medium mt-2">
                        ✅ Email verified successfully
                      </p>
                    )}
                  </div>
                )}
              </div>
      
              {/* Submit Button */}
              <div className="mt-8 flex justify-end md:col-span-2">
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 transition-all text-white px-6 py-3 rounded-md text-lg font-medium shadow"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </>
      );
      
      
      
      async function handlesubmitotp(otp){
          debugger
       try {
        
          const doesverify = await axios.post("http://13.203.207.90:80/api/v1/admin/authenticate",{otp:otp, email:email})
      
        debugger
        if(doesverify.status === 200){
          setVerified(true);
        }
        if(doesverify.status === 411){
          alert("Please check your otp and try again");
        }
       } catch (error) {
        console.log(error);
       }
      }
    async function handleVerifyEmail(email) {
      if (!email) {
        alert("Please enter an email first.");
        return;
      }
     debugger
      // You can later call an API here
      const obj = {
        email:email
      }
      const isverified = await axios.post("http://13.203.207.90:80/api/v1/admin/setotp", obj)
      debugger;

      if(isverified.status ===200){
        setOtpsend(true)
      }
    }
    
}
export default Createcustomer