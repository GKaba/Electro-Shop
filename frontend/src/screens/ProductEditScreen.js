import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col,Image} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from  '../Components/Message'
import Loader from   '../Components/Loader'
import {listProductDetails,updateProduct} from '../actions/productActions'
//import {USER_UPDATE_RESET} from '../constants/userConstants'
import  FormContainer from '../Components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({match,history}) => {

    const productId= match.params.id

    const [name,setName] =useState('')
    const [price,setPrice] =useState(0)
    const [image,setImage]=useState('')
    const [category,setCategory]=useState('')
    const [brand,setBrand]=useState('')
    const [description,setDescription]=useState('')
    const [countInStock,setCountInStock]=useState(0)
    const [uploading,setUploading]=useState(false)
   


    const dispatch = useDispatch()

    const productDetails= useSelector((state) => state.productDetails)
    const{loading,error,product}=productDetails

    const productUpdate=useSelector(state=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate

    

    useEffect(() => {
      
        if(successUpdate)
        {
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }
        else{
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
              } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
              }
        }
        
      
    }, [ dispatch,history,product,productId,successUpdate])

    const submitHandler = (e)=>{
        e.preventDefault()

        dispatch(updateProduct({
            _id:product._id,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }
const uploadFileHandler=async(e)=>
{
  const file=e.target.files[0]
  const formData=new FormData()
  formData.append('image',file)
  setUploading(true)

  try{
const config={
    headers:{
        'Content-Type':'multipart/form-data'
    }
}
const {data}=await axios.post('/api/upload',formData,config)
setImage(data)
setUploading(false)
  }catch (error)
  {
    console.error(error)
    setUploading(false)
  }
}

    return (
        <>
        <Link to='/admin/productlist' className='btn bnt-light my-3'>Go Back</Link>

        <FormContainer>

                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={8}>
                        <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
                </Form.Group>
                        </Col>
                        <Col md={4}> 
                        <Image src={image} height='100' width='125' thumbnail fluid rounded></Image>
                </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter Image url' value={image} onChange={(e)=> setImage(e.target.value)}></Form.Control>
                    <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler} ></Form.File>
                    {uploading && <Loader/>}
                </Form.Group>
                        </Col>
                    </Row>
            <Row>
                <Col>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e)=> setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Count Stock</Form.Label>
                    <Form.Control type='number' placeholder='Enter count In Stock' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                </Col>
               
            </Row>
            <Row>
                <Col>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e)=> setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e)=> setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" cols={10} placeholder='Enter Description' value={description} onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                </Col>
                </Row>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>
            )}
        </FormContainer>
        </>
    )
}

export default ProductEditScreen
