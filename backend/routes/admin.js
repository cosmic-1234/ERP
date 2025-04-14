const express = require("express");
const { renderToBuffer } = require('@react-pdf/renderer')
const router = express.Router();
const zod = require("zod");
const react = require("react");
const { prismaClient } = require("../db/db");
const sgMail = require('@sendgrid/mail');
const ReactPDF = require('@react-pdf/renderer');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
require('@babel/register')({
    extensions: ['.js', '.jsx']
  });
const InvoicePDF = require('../invoicepdf.jsx');
async function sendEmailWithPDF (invoice, totalamount) {
    // Generate PDF as buffer
    try {
       
    
        const pdfElement = await react.createElement(InvoicePDF, {
            invoice: invoice,
            totalamount: totalamount,
          }); 
          const pdfBuffer = await renderToBuffer(pdfElement);
          const msg1 = {
            to: `${invoice.customer.email}`,
            from: {
                name: "ASAP ERP",
                email:'baskinson1221@gmail.com', // Your SendGrid verified sender email
            },
            templateId: process.env.TEMPLATE_ID,
            dynamic_template_data: {
                customerno: invoice.customer.customerno, // This should match the placeholder in your SendGrid template
              },
              attachments: [
                {
                  content: pdfBuffer.toString('base64'),
                  filename: `${invoice.invoice.billingno}invoice.pdf`,
                  type: 'application/pdf',
                  disposition: 'attachment',
                },
              ],
          };
          try {
            await sgMail.send(msg1);
            console.log('Invoice email sent successfully');
          } catch (error) {
            console.error('Error sending email:', error.response?.body || error.message);
          }
    } catch (error) {
        
    }
    
  
      
  
  
    // Configure nodemailer
  
    // Email options
    
    }
  
const CUSTOMERBODY = zod.object({
   
  customerno:   zod.string(),
  name:         zod.string(),
  address:      zod.string(),
  paymentterms: zod.string(),
  shipcond:     zod.string(),
  creditlimit:  zod.number().multipleOf(0.01),
  email:        zod.string()
})
const MATERIALBODY = zod.object({
  materialno:     zod.string(),
  description:    zod.string(),
  uom:            zod.string(),
  pricingdetails: zod.object({   
    price: zod.number(),
    currency: zod.string()
  })
})
const SALESBODY =       zod.object({
    orderno:            zod.string(),
    customerno:         zod.string(),
    orderdate:          zod.coerce.date().refine((date) => date < new Date()),
    deliverydate:       zod.coerce.date().refine((date)=>date >= new Date()),
    shippingaddress:    zod.string(),
    paymentterms:       zod.string(),
    shippingconditions: zod.string()
})
router.post("/addcustomer", async(req, res)=>{
try {
    const success = CUSTOMERBODY.safeParse(req.body);
    if(success.success){
         const customer = await prismaClient.customer.create({
            data:{
                customerno: success.data.customerno,
                name:success.data.name,
                address:success.data.address,
                paymentterms:success.data.paymentterms,
                shipcond:success.data.shipcond,
                creditlimit:success.data.creditlimit,
                email:success.data.email
            }
         })
         if(customer){
        try {
            const msg = {
                to: customer.email,
                from: {
                    name: "BIGBANG",
                    email:'baskinson1221@gmail.com', // Your SendGrid verified sender email
                },
                templateId: process.env.TEMPLATE_ID,
                dynamic_template_data: {
                    customerno: customer.customerno, // This should match the placeholder in your SendGrid template
                  }
              };
               await sgMail.send(msg)
              return res.status(200).json({
                message: "Success"
              })
        } catch (error) {
            return res.status(200).json({
                message:"Error while sending the mail but customer created successfully"
            })
        }
         }
         else{
            return res.status(411).json({
                message: "Error while creating database entry"
            })
         }
    }
    else{
        return res.json({
            message:"Invalid inputs"
        }).status(411)
    }
} catch (error) {
    return res.status(411).json({
        message:error
    })
}


})
router.post("/addmaterial", async(req,res)=>{
const success = MATERIALBODY.safeParse(req.body)
if(success.success){
    const material = await prismaClient.material.create({
        data:{materialno: success.data.materialno,
        description:success.data.description,
        uom: success.data.uom,
        pricingdetails: success.data.pricingdetails
        }
    })
    if(material){
        return res.status(200).json({
            message: `Material was created with id: ${material.id}`
        })
    }
}
})
router.post("/createsalesorder", async(req, res)=>{
 try {
    const success = SALESBODY.safeParse(req.body)
    if(success.success){
        const customer = await prismaClient.customer.findFirst({
            where:{
                customerno: success.data.customerno
            },
        })
        if(!customer){
            return res.status(411).json({
                message: "Customer does not exist"
            })
        }
     try {
        const salesorder = await prismaClient.salesorder.create({
            data:{
                orderno:            success.data.orderno,
                customerid:         customer.id,
                orderdate:          success.data.orderdate,
                deliverydate:       success.data.deliverydate,
                shippingaddress:    success.data.shippingaddress,
                paymentterms:       success.data.paymentterms,
                shippingconditions: success.data.shippingconditions
            }
           })
           if(salesorder){
            //implement the logic to send mail to the customer that the sales order has been created for this order
            return res.status(200).json({
                message: `Sales order created successfully with Sales order no ${salesorder.orderno}`
           })
        }
        else{
            return res.status(411).json({
                message: "Error while creating database entry"
        })
        }
     } catch (error) {
        return res.status(411).json({
            message: "This sales order already exists"
        })
     }
      
    }
    else{
        return res.status(411).json({
            message: "Invalid inputs / Invalid details"
        })
    }
 } catch (error) {
    
 }

 
})
const SALESORDERITEM = zod.object({
    orderno: zod.string(),
    materialno: zod.string(),
    quantity: zod.number().multipleOf(0.01),
    unitprice: zod.number().multipleOf(0.01),
    discount:  zod.number().multipleOf(0.01).optional()  
})
router.post("/createsalesorderitem", async(req,res)=>{
try {
    
    const success = SALESORDERITEM.safeParse(req.body)
    if(success.success){
     const material = await prismaClient.material.findFirst({
        where:{
            materialno: success.data.materialno
        }
     })
     if(!material){
        return res.status(411).json({
         message: "Material does not exist"
        })
     }
     const salesorder = await prismaClient.salesorder.findFirst({
        where:{
            orderno: success.data.orderno
        }
     })
     if(!salesorder){
        return res.status(411).json({
            message: "Salesorder does not exist"
        })
     }
    try {
        const salesorderitem = await prismaClient.salesorderitems.create({
            data:{
                salesorderid: salesorder.id,
                materialid: material.id,
                quantity: success.data.quantity,
                unitprice: success.data.unitprice,
                discount:  success.data.discount
            }
         })
         if(salesorderitem){
            return res.status(200).json({
                message: "Salesorder item created successfully"
            })
        }
        else{
            return res.status(411).json({
                message: "Error while creating item"
            })
        }
    } catch (error) {
        console.log(error)
    }
    }
    else{
        return res.status(411).json({
            message: "Please check the inputs"
        })
    }
} catch (error) {
    
}

})
const DELIVERYBODY = zod.object({
    deliveryno: zod.string(),
  salesorderno: zod.string(),
  deliverydate: zod.coerce.date(),
  shippingaddress: zod.string(),
  goodsissuedate: zod.coerce.date().optional()
})
router.post("/createdelivery", async(req,res)=>{
    try {
        const success = DELIVERYBODY.safeParse(req.body)
        if(!success.success){
            return res.status(411).json({
                message: "Invalid inputs"
            })
        }
        const salesorder = await prismaClient.salesorder.findFirst({
            where: {
                orderno: success.data.salesorderno
            }
        })
        if(!salesorder){
            return res.status(411).json({
                message: "sales order does not exist"
            })
        }
        const salesOrderDeliveryDate = new Date(salesorder.deliverydate);
        const incomingDeliveryDate = new Date(success.data.deliverydate);
    if (salesOrderDeliveryDate.getTime() !== incomingDeliveryDate.getTime()) {
            return res.status(411).json({
                message: "Delivery date in sales order and delivery does not match"
            })
        }
        try {
            const delivery  = await prismaClient.delivery.create({
               data: {deliveryno: success.data.deliveryno,
                salesorderid: salesorder.id,
                deliverydate: success.data.deliverydate,
                shippingaddress: success.data.shippingaddress,
                goodsissuedate: success.data.goodsissuedate
        }})
            if(delivery){
                return res.status(200).json({
                    message: `delivery created successfully with id: ${delivery.id} and Number: ${delivery.deliveryno}`
                })
            }
            else{
                return res.status(411).sjon({
                    message: "Error while creating delivery please try again after sometime"
                })
            }
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
})
const INVOICEBODY = zod.object({
    billingno:      zod.string(),
    orderno:        zod.string(),
    billingdate:    zod.coerce.date().refine((date)=> date <= new Date()),
    amount:         zod.number().multipleOf(0.01)
})
router.post("/createinvoice", async(req, res)=>{
   try {
    const success = INVOICEBODY.safeParse(req.body)
    if(!success.success){
        return res.status(411).json({
            message: "invalid inputs"
        })
    }
    const salesorder = await prismaClient.salesorder.findFirst({
        where:{
         orderno: success.data.orderno   
        },
        include: {
            orderitems: true, 
          },
    })
    if(!salesorder){
        return res.status(411).json({
            message: "Sales order does exist"
            
        })
    }
    const customer = await prismaClient.customer.findFirst({
        where:{
            id: salesorder.customerid
        }
    })
    const invoice = await prismaClient.invoice.create({
        data:{
            billingno:      success.data.billingno,
            salesorderid:   salesorder.id,
            billingdate:    success.data.billingdate,
            amount:         success.data.amount
        }
    })
    if(invoice){
        const total_amount = salesorder.orderitems.reduce((total, item)=>{
                   return total  =  total+item.quantity*item.unitprice
        },0)
        const obj1 = {
            invoiceitems: salesorder.orderitems,
            invoice:invoice,
            customer:customer  
        }
        await sendEmailWithPDF(obj1,total_amount)
      
        return res.status(200).json({
            message: `Invoice created with invoice no ${invoice.billingno} and id: ${invoice.id}`,
            invoiceitems: salesorder.orderitems,
            invoice:invoice,
            customer:customer
        })
           
        
    }

   } catch ( error) {
    // console.log(error);
   }
})
// router.get("/getcust", async(req, res)=>{
//     const customerno = req.query.customerno
//     try {
//         const customer = await prismaClient.customer.findFirst({
//             where:{
//                 customerno:customerno
//             }
//         })
//         if(customer){
//             res.status(200).json({
//                 customer: customer
//             })
//         }
//         else{
//             res.status(411).json({
//                 message:"Customer does not exist"
//             })
//         }
//     } catch (error) {
//         res.status(411).json({
//             message: "Error while fetching customer please try again after sometime"
//         })
//     } 
// })
router.get("/getcust", async (req, res) => {
    const customerno = req.query.customerno;
  
    try {
      const customers = await prismaClient.customer.findMany({
        where: {
          customerno: {
            contains: customerno,  // Use 'startsWith' for prefix search
            mode: 'insensitive'    // Optional: makes it case-insensitive
          }
        },
        take: 10 // Optional: limit results for performance
      });
  
      if (customers.length > 0) {
        res.status(200).json({ customers });
      } else {
        res.status(404).json({ message: "No customers found" });
      }
  
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({
        message: "Error while fetching customers. Please try again later."
      });
    }
  });




router.get("/getamount", async(req,res)=>{
    const orderWithItems = await prismaClient.salesorder.findUnique({
        where: {
          orderno: req.query.orderno
        },
        include: {
          orderitems: true, 
        },
      });
      if(orderWithItems){
        const amount = orderWithItems.orderitems.reduce((sum,item)=>{
            return sum + item.quantity*item.unitprice
        },0)
        return res.json({
            amount: amount
        })
      }
})
module.exports=router