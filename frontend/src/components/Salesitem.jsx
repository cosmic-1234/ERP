import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import { addsalesitem, editstate } from "../redux/slicers/salesitemslicer";
import axios from "axios";
import { useEffect } from "react";
import { store } from "../redux/store";
const Salesitem = ()=>{
  
    const dispatch = useDispatch()
    let items = useSelector((state)=>state.salesitemslice) 
    const currentSalesNo1 = store.getState().homepageslice.salesno;
    items = items.filter((item)=>item.salesorder && item.salesorder===currentSalesNo1)
    const SALESNO = useSelector((state)=>state.homepageslice.salesno);
    const [rows, setRows] = useState(items);
    
    console.log(items)
    useEffect(()=>{
      const currentSalesNo = store.getState().homepageslice.salesno;
       dispatch(addsalesitem(currentSalesNo))
    
    },[])
      const handleChange = (index, field, value) => {
        debugger
       const obj = {
          index:index,
          field:field,
          value:value
        }
        dispatch(editstate(obj))
        debugger
        console.log(items)
      };
    
      return (
        <>
          <div className="overflow-x-auto mt-8 shadow-lg rounded-lg">
            <table className="table-auto border-collapse w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100 uppercase text-gray-600 text-sm">
                <tr>
                  <th className="border px-6 py-3">Material</th>
                  <th className="border px-6 py-3">Quantity</th>
                  <th className="border px-6 py-3">Unit Price</th>
                  <th className="border px-6 py-3">Sales Order</th>
                  <th className="border px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row, index) => (
                  
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border px-6 py-3">
                      <input
                      disabled = {row.disabled}
                        type="text"
                        value={row.material}
                        onChange={(e) => handleChange(index, "material", e.target.value)}
                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-6 py-3">
                      <input
                      disabled = {row.disabled}
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleChange(index, "quantity", e.target.value)}
                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-6 py-3">
                      <input
                      disabled = {row.disabled}
                        type="number"
                        value={row.unitprice}
                        onChange={(e) => handleChange(index, "unitprice", e.target.value)}
                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-6 py-3">
                      <input
                      disabled 
                        type="text"
                        value={row.salesorder}
                        // onLoad={handleChange(index, "salesorder", row.salesorder)}
                        
                        className=" bg-gray-100 border-gray-300 w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="border px-6 py-3 text-center">
                      <button
                      disabled = {row.disabled}
                        onClick={() => Createsalesitem(row, index, "disabled")}
                        className={`${row.disabled?"bg-green-700":"bg-blue-900 hover:bg-blue-800 hover:cursor-pointer"}  text-white font-medium py-2 px-4 rounded-md transition`}
                      >
                        {row.disabled? "Item Created": "Create Sales Item"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
          <div className="mt-6 flex justify-end">
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md text-lg transition"
              onClick={()=>Additem(SALESNO)}
            >
              + Add Item
            </button>
          </div>
        </>
      );
      async function Createsalesitem(item, index){
        debugger
        const req = {
              orderno:    item.salesorder,
              materialno: item.material,
              quantity: parseInt(item.quantity),
              unitprice: parseInt(item.unitprice)
        }
        try {
          const response = await axios.post("http://13.203.207.90:80/api/v1/admin/createsalesorderitem", req)
        console.log(response)
        const obj1 = {
          index:index,
          field:"disabled",
          value:true
        }
        dispatch(editstate(obj1))
        } catch (error) {
          alert("Some error occured hence sales item is not created please check your input fields and try again")
        }
        
      }
      function Additem(salesno){
        const currentSalesNo = store.getState().homepageslice.salesno;
        console.log("Current salesno:", currentSalesNo);
      
         const temp = {
          material: "",
          quantity:"",
          unitprice:"",
          salesorder:currentSalesNo
           }
           //setRows(temp);
           dispatch(addsalesitem(temp))
           //console.log(items)
      }
      
}
export default Salesitem