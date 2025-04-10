import React from "react";

const Homepage = ()=>{
    return (
        <>
          {/* Wrapper to take full screen and prevent scroll */}
          <div className="h-screen flex flex-col overflow-hidden">
      
            {/* Navbar */}
            <nav className="bg-sap p-4 shadow-md">
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
                  <button className="w-full py-3 bg-sap text-white font-medium rounded-md shadow hover:bg-sap-dark transition duration-200">
                    Create Sales Order
                  </button>
      
                  {/* Change Sales Order Button */}
                  <button className="w-full py-3 bg-sap text-white font-medium rounded-md shadow hover:bg-sap-dark transition duration-200">
                    Change Sales Order
                  </button>
      
                  {/* Display Delivery Button */}
                  <button className="w-full py-3 bg-sap text-white font-medium rounded-md shadow hover:bg-sap-dark transition duration-200">
                    Display Delivery
                  </button>
      
                </div>
              </div>
            </div>
          </div>
        </>
      );
      }
export default Homepage