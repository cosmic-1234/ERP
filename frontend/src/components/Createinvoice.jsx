import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './Printpdf';
const Createinvoice =()=>{
  const [invoicedata, setInvoicedata] = useState({})
  const[billingno, setBillingno] = useState("")
  const[billingdate, setBillingdate]=useState("")
  const[invoicecreated, setInvoicecreated] = useState(false);
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
 if(invoicecreated === true)
  setInvoicecreated(invoicecreated)


},[SALESNO])
    return(
      <>
      <nav className="bg-blue-900 text-white font-bold text-3xl px-10 py-4 shadow-md sticky top-0 z-50">
        ASAP ERP
      </nav>
        <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-md shadow-md mt-10">
          
  <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
    Create Billing
  </h2>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">Billing No.</label>
      <input
      onChange={(e)=>setBillingno(e.target.value)}
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
      onChange={(e)=>setBillingdate(e.target.value)}
      required
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
    onClick={handlesubmit}
      type="submit"
      disabled={invoicecreated}
      className={`${invoicecreated ? "bg-green-600" : "bg-blue-900 hover:bg-blue-800"} transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm`} 
    >
      {invoicecreated?"Invoice Created":"Create Invoice"}
    </button>
    {invoicedata?.invoice?.billingno && (
    <PDFDownloadLink className="bg-blue-900 ml-6 text-white px-6 py-3 rounded-md text-xl shadow-sm"
   
   document={<InvoicePDF invoice={invoicedata} totalamount={finalamount}/>}
    fileName={`invoice-${invoicedata.invoice.billingno}.pdf`}
  >
    {({ loading }) => (loading ? 'Preparing PDF...' : 'Download Invoice')}
  </PDFDownloadLink>) }
  </div>
</div>
</>
    )
    async function handlesubmit() {
 try {
  debugger
  const req = {
    billingno: billingno,
    orderno:SALESNO,
    billingdate:billingdate,
    amount:finalamount
}
const invoice_response = await axios.post("http://localhost:3000/api/v1/admin/createinvoice", req)
debugger
if(invoice_response.status === 200){
  alert("Invoice created successfully");
  setInvoicecreated(true)
  setInvoicedata(invoice_response.data);
}  else{
    alert("invoice NOT created and went into some error please try after sometime");
  }

 } catch (error) {
  console.log(error)
 }
    }
}
export default Createinvoice