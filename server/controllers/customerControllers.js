const Customer= require("../models/Customer");

const mongoose=require("mongoose");

/**
 * Get/
 * HomePage
 */

exports.homepage= async(req,res)=>{
  // const messages = await req.consumerFlash("info");

    const locals={
        title:"Nodejs",
        description:"Free Nodejs User Management system"
    }

    try{
    const customers= await Customer.find({}).limit(22);
    res.render("index",{locals,customers});
    }catch(err){
        console.log(err);
    }

    
}

/**
 * Get/
 * add Customers
 */
exports.addCustomer= (req,res)=>{
    const locals={
        title:"Add new Customers",
        description:"Free Nodejs User Management system"
    }

    res.render("customer/add",locals);
}
exports.addCustomer=(req,res)=>{
}
/**
 * post/
 *  * add Customers
 Customers
 */
exports.postCustomer= async(req,res)=>{

    console.log(req.body);
  const newCustomer=new Customer({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    details:req.body.details,
    tel:req.body.tel,
    email:req.body.email,
  })

  try{
    await Customer.create(newCustomer);
    // await req.flash("info","New customer has been added.");
    res.redirect("/");
 
  }catch(err){
    console.log(err)
  }

}