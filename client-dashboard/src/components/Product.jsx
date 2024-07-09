import React, { useEffect, useState } from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'


const Product = () => {

    const [productList, setProductList] = useState([])

    const host = "http://localhost:5000/api"
    useEffect(() => {
        fetch("http://localhost:5000/api/products").then((res) => {
            res.json().then(data => {
                setProductList(data)
                console.log(data, "products list")
            })
        }).catch(e => { console.log('Error:', e) })
    }, [])

    // deleteProduct
    const deleteProduct = (_id) => {
        // console.log(_id, localStorage.getItem('token'),":id")
        fetch(`http://localhost:5000/api/delete/${_id}`, {
            method: "delete",
            headers: {
                // 'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                // 'Authorization': `Bearer ${token}`,
            },

        }).then((res) => {
            res.json().then(data => {
                // setProductList(data)
                if (productList.length > 0) {
                    setProductList(prevProducts => prevProducts.filter(product => product._id !== data._id));
                    console.log(data, "product deleted")
                }
            })
        }).catch(e => { console.log('Error:', e) })
    }

    // updateProduct
    const updateProduct = async (_id) => {

        try {
            // api call 
            const response = await fetch(`${host}/update/${_id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({})

            })
            const json = await response.json()
            console.log(json, 'response update')

        } catch (error) {
            console.log('error occured:', error)
        }
    }


    return (

        <>
            <div className="w-full h-full">

                <h2 className='text-2xl  p-4 text-center font-semibold'>List Of Products</h2>

                {/* <div className="flex flex-row items-center px-8 "> */}

                <div className='w-full flex flex-wrap justify-center items-center gap-2 py-2'>
                    {productList?.map((product, index) => (
                        <div key={index} className="max-w-[200px] bg-white border-2 p-4">
                            <h2 className='font-semibold'>{product.name}</h2>
                            {/* <h2>{product.description}</h2> */}
                            <img src={product.imageUrl} alt="" />
                            <span>Rs.{product.price}</span>

                            <div className="mt-2 flex flex-row justify-center  gap-2 border-t-2 p-2">

                                <button onClick={() => { deleteProduct(product._id) }} className='px-2 py-1 hover:bg-white hover:border-2 hover:text-black bg-red-500  text-white rounded'>delete</button>
                                <Link to={`/update/${product._id}`} className='px-2 py-1  hover:bg-white hover:border-2 hover:text-black  bg-[#ff59cd] text-white rounded'>update</Link>
                            </div>
                        </div>
                    ))
                    }
                    <Link to={"/add"} className='text-3xl text-[#ff59cd]' ><BsPlusCircle /> </Link>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default Product
