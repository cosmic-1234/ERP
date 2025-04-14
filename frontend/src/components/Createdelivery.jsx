import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Createdelivery=()=>{
  const navigate = useNavigate();
    const [pgi, setPgi] = useState("")
    const [deliveynumber, setDeliverynumber] = useState("")
    const [delcreate, setDelcreate] = useState(false);
    const SALESNO = useSelector((state)=>state.homepageslice.salesno)
    const DELDATE = useSelector((state)=>state.homepageslice.deldate)
    const SHIPADDRESS = useSelector((state)=>state.homepageslice.shipaddress)
    return(
        <>
        <nav className="bg-blue-900 text-white font-bold text-3xl px-10 py-4 shadow-md sticky top-0 z-50">
        ASAP ERP
      </nav>
       <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-md shadow-md mt-10">
  <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
    Create Delivery
  </h2>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Delivery No.</label>
      <input
      onChange={(e)=>setDeliverynumber(e.target.value)}
        type="text"
        placeholder="Enter delivery number"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Sales Order No.</label>
      <input
      value={SALESNO}
      disabled
        type="text"
        placeholder="Enter sales order number"
        className=" bg-gray-100 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Date</label>
      <input
      value={DELDATE}
      disabled
        type="date"
        className="bg-gray-100 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Address</label>
      <input
      value={SHIPADDRESS}
      disabled
        type="text"
        placeholder="Enter shipping address"
        className=" bg-gray-100 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Goods Issue Date</label>
      <input
      onChange={(e)=>setPgi(e.target.value)}
        type="date"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </form>

  {/* Submit Button */}
  <div className="mt-8 flex justify-end">
    <button
    onClick={handlecreatedelivery}
    disabled={delcreate}
      type="submit"
      className={`${delcreate ? "bg-green-600" : "bg-blue-900 hover:bg-blue-800"} transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm mr-6`}

    >
     {delcreate?"delivery created":"Create delivery"}
    </button>
    <button
    onClick={handlecrateinvoice}
      type="submit"
      disabled={!delcreate}
      className={`${delcreate ? "bg-blue-900 hover:cursor-pointer hover:bg-blue-800" : "bg-gray-500"} transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm`}
    >
      Create Invoice
    </button>
  </div>
</div>
</>
    )
    async function handlecreatedelivery() {
        debugger;
        try {
            const obj = {
                deliveryno:deliveynumber,
                salesorderno:SALESNO,
                deliverydate:DELDATE,
                shippingaddress:SHIPADDRESS,
                ...(pgi && { goodsissuedate: pgi }) 
                }
                const delivery_response = await axios.post("http://localhost:3000/api/v1/admin/createdelivery", obj)
                if(delivery_response.status === 200){
                    alert("Delivery Created Successfully")
                    setDelcreate(true);
                }
                else{
                    alert("Error while creating delivery")
                }
        } catch (error) {
            alert(error)
        }
    }
    async function handlecrateinvoice(){
          navigate("/createinvoice")
    }
}
export default Createdelivery