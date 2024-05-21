const express=require('express')
const app=express()

app.set("view engine","ejs")

app.get('/',(req,res)=>{
    console.log('READY')
    res.render("index")
})
const indexRouter=require('./routes/index');
app.use('/invoiceValidator',indexRouter);
app.listen(8006)