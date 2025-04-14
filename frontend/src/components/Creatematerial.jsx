import React, { useState } from "react";
import axios from "axios"
const Creatematerial = ()=>{
    const [material, setMaterial] = useState("")
    const [materialdesc, setMaterialdesc] = useState("")
    const [uom, setUom] = useState("")
    const [unitprice, setUnitprice] = useState("")
    const [currency, setCurrency] = useState("")

    async function handlesubmit(e){
        e.preventDefault(); 
        debugger
        const obj = {
            materialno: material,
            description:materialdesc,
            uom:uom,
            pricingdetails:{
                price:parseInt(unitprice),
                currency:currency
            }
        }
        const response_material = await axios.post("http://localhost:3000/api/v1/admin/addmaterial", obj)
        debugger
        if(response_material){
            alert(`Material created successfully with material`)
        }
        else{
            alert("we fucked up");
        }
    }
    return (
        <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-md shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
          Add Material
        </h2>
      
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg" onSubmit={(e)=>handlesubmit(e)} >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Material</label>
            <input
              onChange={(e)=>setMaterial(e.target.value)}
              type="text"
              placeholder="Enter material"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
      
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Material Description</label>
            <input
              onChange={(e)=>setMaterialdesc(e.target.value)}
              type="text"
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
      
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Unit of Measurement</label>
            <input
            onChange={(e)=>setUom(e.target.value)}
              type="text"
              placeholder="e.g., KG, PCS"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
      
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Unit Price</label>
            <input
              onChange={(e)=>setUnitprice(e.target.value)}
              type="text"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
      
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Currency</label>
            <input
            onChange={(e)=>setCurrency(e.target.value)}
              type="text"
              placeholder="e.g., USD, INR"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 transition-all text-white px-6 py-3 rounded-md text-xl shadow-sm"
          >
            Add Material
          </button>
        </div>
        </form>
      
        {/* Submit/Add Button */}
        
      </div>
      );
}
export default Creatematerial