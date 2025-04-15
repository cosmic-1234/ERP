import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import  {setorderdate, setcustno, setdeldate, setsalesno, setshipaddress, setshipcondition, setpayterm} from '../redux/slicers/homepageslice'
import Salesitem from "./Salesitem";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { useEffect } from "react";
import { addsalesitem, editstate } from "../redux/slicers/salesitemslicer";
import { store } from "../redux/store";

const CreateSO = ()=>{
  const navigate = useNavigate()
  const [customerSuggestions, setCustomerSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
  const [salesno, setSalesno] = useState("");
  const [custno, setCustno] = useState("");
  const [deliverydate, setDeliverydate] = useState("");
  const [orderdate, setOrderdate] = useState("");
  const [shipaddr, setShipaddr] = useState("");
  const [payterm, setPayterm] = useState("");
  const [shipcond, setShipcond] = useState("");
  const dispatch = useDispatch()
  const SALESNO = useSelector((state)=>state.homepageslice.salesno);
  const CUSTNO = useSelector((state)=>state.homepageslice.custno)
  const DELDATE = useSelector((state)=>state.homepageslice.deldate)
  const ORDERDATE = useSelector((state)=>state.homepageslice.orderdate)
  const SHIPADDRESS = useSelector((state)=>state.homepageslice.shipaddress)
  const SHIPCONDITION = useSelector((state)=>state.homepageslice.shipcondition)
  const PAYTERMS = useSelector((state)=>state.homepageslice.payterms)

//   salesno: "",
//         custno: "",
//         deldate: "",
//         orderdate: "",
//         shipaddress: "",
//         shipcondition:"",
//         payterms:""
const[createsales, setCreatesales] = useState(false)
const handleCustomerSelect = (cust) => {
  dispatch(setcustno(cust.customerno));
  dispatch(setshipaddress(cust.address));
  dispatch(setshipcondition(cust.shipcond));
  dispatch(setpayterm(cust.paymentterms));
  setShowSuggestions(false);
};
const debouncedSearch = debounce(async (query) => {
  if (query.trim() === "") return;

  try {
    const response = await axios.get("http://13.203.207.90:80/api/v1/admin/getcust", {
      params: { customerno: query },
    });

    if (response.data.customers) {
      setCustomerSuggestions(response.data.customers);
    } else {
      setCustomerSuggestions([]);
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    setCustomerSuggestions([]);
  }
}, 1200); 



return (
    <>
      {/* Sticky, Stylish Navbar */}
      <nav className="bg-blue-900 text-white font-bold text-3xl px-10 py-4 shadow-md sticky top-0 z-50">
        ASAP ERP
      </nav>
  
      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-md shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
          Create Sales Order
        </h2>
  
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div>
            <label htmlFor="order" className="block mb-1 text-gray-600">Sales Order</label>
            <input
              disabled = {createsales}
              id="order"
              type="text"
              placeholder="123456"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={SALESNO}
              onChange={(e) => dispatch(setsalesno(e.target.value))}
            />
          </div>
  
          <div>
            <label htmlFor="cust" className="block mb-1 text-gray-600">Customer No.</label>
            <input
              id="cust"
              type="text"
              placeholder="123456"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={CUSTNO}
              onChange={(e) => {
                dispatch(setcustno(e.target.value));
                debouncedSearch(e.target.value);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && customerSuggestions.length > 0 && (
          <div className="border border-gray-500 bg-white rounded-sm shadow-md max-h-60 overflow-y-auto mt-1 absolute z-10 w-135">
          {customerSuggestions.map((cust, idx) => (
           <div
           key={idx}
        onClick={() => handleCustomerSelect(cust)}
        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
         >
        {cust.customerno} - {cust.name}
         </div>
        ))}
         </div>
)}
          </div>
  
          <div>
            <label htmlFor="orderdate" className="block mb-1 text-gray-600">Sales Order Date</label>
            <input
              id="orderdate"
              type="date"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ORDERDATE}
              onChange={(e) => dispatch(setorderdate(e.target.value))}
            />
          </div>
  
          <div>
            <label htmlFor="deliverydate" className="block mb-1 text-gray-600">Delivery Date</label>
            <input
              id="deliverydate"
              type="date"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={DELDATE}
              onChange={(e) => dispatch(setdeldate(e.target.value))}
            />
          </div>
  
          <div>
            <label htmlFor="addr" className="block mb-1 text-gray-600">Shipping Address</label>
            <input
              id="addr"
              type="text"
              readOnly
              placeholder="Shipping Address"
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-600"
              value={SHIPADDRESS}
            />
          </div>
  
          <div>
            <label htmlFor="term" className="block mb-1 text-gray-600">Payment Terms</label>
            <input
              id="term"
              type="text"
              placeholder="EXAMPLE"
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-600"
              value={PAYTERMS}
            />
          </div>
  
          <div>
            <label htmlFor="ship" className="block mb-1 text-gray-600">Shipping Conditions</label>
            <input
              id="ship"
              type="text"
              placeholder="EXAMPLE"
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-600"
              value={SHIPCONDITION}
            />
          </div>
        </div>
  
        {/* Button */}
        <div className="mt-10 flex justify-end gap-5">
          <button
            onClick={searchcustomer}
            className="bg-blue-900 hover:bg-blue-800 transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm"
          >
            Search Customer
          </button>
          <button
            onClick={createsalesorder}
            className ={`${createsales? "bg-green-500": "bg-blue-900"} "hover:bg-blue-800 transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm"`}
          disabled = {createsales}
         >
            {createsales? "Salesorder Created": "Create Salesorder"}
          </button>
          <button
            onClick={handledelivery}
            className ={`${createsales? "bg-blue-900 hover:cursor-pointer": "bg-gray-500"} "hover:bg-blue-800 transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm"`}
          disabled = {!createsales}
         >
            Create Delivery
          </button>
        </div>
      </div>{ createsales && <Salesitem/>}
      
    </>
  );
  async function handledelivery (){
  navigate("/createdelivery")
  }
async function createsalesorder() {
    debugger
  const req = {
     orderno:               SALESNO,
        customerno:         CUSTNO,
        orderdate:          ORDERDATE,
        deliverydate:       DELDATE,
        shippingaddress:    SHIPADDRESS,
        paymentterms:       PAYTERMS,
        shippingconditions: SHIPCONDITION
  }
  const salesorder = await axios.post("http://13.203.207.90:80/api/v1/admin/createsalesorder", req)
  if(salesorder){
    setCreatesales(true);
  }
}

    async function searchcustomer() {

        
        const customer = await axios.get("http://13.203.207.90:80/api/v1/admin/getcust", {params:{customerno: CUSTNO}})
        // setorderdate, setcustno, setdeldate, setsalesno, setshipaddress, setshipcondition
        if(customer){
            
            console.log(customer);
            dispatch(setcustno(customer.data.customer.customerno))
            dispatch(setshipaddress(customer.data.customer.address))
            dispatch(setshipcondition(customer.data.customer.shipcond));
            dispatch(setpayterm(customer.data.customer.paymentterms));

        }
        
        
    } 
    
}
export default CreateSO