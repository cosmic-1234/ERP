import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = ()=>{
    const navigate = useNavigate()
    return (
        <>
          {/* Wrapper to take full screen and prevent scroll */}
          <div className="h-screen flex flex-col overflow-hidden">
      
            {/* Navbar */}
            <nav className="bg-blue-900 p-4 shadow-md">
              <h1 className="text-white text-2xl font-semibold">ASAP ERP</h1>
            </nav>
      
            {/* Main content takes remaining height */}
            <div className="flex-grow flex justify-center items-center bg-gray-50 px-6">
              <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-8">
                  Sales Order Management
                </h1>
      
                <div className="space-y-4">
      
                  {/* Create Sales Order Button */}
                  <button className="w-full py-3 bg-blue-900 text-white font-medium rounded-md shadow hover:bg-sap-dark transition duration-200"
                  onClick={handleonclick}
                  >
                    Create Sales Order
                  </button>
      
                  {/* Change Sales Order Button */}
                  <button
                  onClick={handleonclick1}
                  className="w-full py-3 bg-blue-900 text-white font-medium rounded-md shadow hover:bg-sap-dark transition duration-200">
                    Create Material
                  </button>
      
                  {/* Display Delivery Button */}
                  <button
                   onClick={handleonclick2}
                    className="w-full py-3 bg-blue-900 text-white font-medium rounded-md shadow hover:bg-sap-dark transition duration-200">
                    Create Customer
                  </button>
      
                </div>
              </div>
            </div>
          </div>
        </>
      );
      function handleonclick(){
        debugger;
        navigate("/createsalesorder")
      }
      function handleonclick1(){
        debugger;
        navigate("/addmaterial")
      }
      function handleonclick2(){
        debugger;
        navigate("/addcustomer")
      }

      }
      
export default Homepage