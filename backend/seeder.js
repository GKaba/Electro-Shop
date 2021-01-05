import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

import connectDB from './config/db.js'
connectDB()

const destroyData=async()=>{
    try {
        await Order.deleteMany()
       await User.deleteMany()
       await Product.deleteMany()

       console.log('Data Destroyed'.red.inverse)
       process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}
const importData=async() =>{

    try {
       
       const createdUsers =await User.insertMany(users)

       const adminUser=createdUsers[0]._id

       const sampleProducts=products.map(product =>{
           return {...product,user:adminUser}
       })
       await Product.insertMany(sampleProducts)

       console.log('data imported'.green.inverse)
       process.exit()
    } catch (error) {
        
        console.error(`${error}`.red.inverse)
    }

}

if(process.argv[2]==='-d')
{
    destroyData()
}
else{
    importData()
}
