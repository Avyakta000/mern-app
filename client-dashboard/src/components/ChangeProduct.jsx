import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

const ChangeProduct = () => {

    const { _id } = useParams();
    console.log(_id, "id in upda prod")
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/product/${_id}`);
                if (response) {
                    const data = await response.json();
                    console.log(data, "data response useEffect")
                    setFormData({
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        image: data.imageUrl,
                    });
                    //   setItem(data);
                } else {
                    throw new Error('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [_id]); // Fetch data whenever _id changes


    const navigator = useNavigate()



    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('price', formData.price);
        form.append('description', formData.description);
        form.append('image', formData.image);
        console.log(formData, "formdata in updateproduct")
        fetch(`http://localhost:5000/api/products/${_id}`, {
            method: "put",
            // body: JSON.stringify(form),
            headers: {
                'auth-token': localStorage.getItem('token')

            },
            body: form


        }).then((res) => {
            res.json().then(data => {
                // setProductList(data)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item added successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(data, "product added")
                navigator("/")
            })
        }).catch(e => { console.log('Error:', e) })


        // Reset form fields if needed

        // Reset form fields if needed
        setFormData({
            name: '',
            price: '',
            description: '',
            image: null,
        });

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log(formData.image,'image')
        setFormData({
            ...formData,
            image: file,
        });
    };

  return (
    <>

<div className="px-4 bg-white rounded">
            <h2 className="text-3xl text-center font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit} className="w-[50%] mx-auto space-y-4">



                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"

                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-3 py-2  border-grat-300 border-b-2  focus:outline-none focus:ring-pink-500 focus:border-pink-500"

                />

                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    name="price"

                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border-b-2 border-gray-300   focus:outline-none focus:ring-pink-500 focus:border-pink-500"

                />

                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    rows="1"
                    name="description"

                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border-b-2 border-gray-300   focus:outline-none focus:ring-pink-500 focus:border-pink-500"

                ></textarea>

                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                    type="file"
                    // accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="block w-full px-3 py-2 border-b-2 border-gray-300   focus:outline-none focus:ring-pink-500 focus:border-pink-500"

                />

                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md  text-white bg-[#ff59cd] hover:bg-[#ffffff] text-color[#ff59cd] focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                    Add Product
                </button>
            </form>
        </div>
      
      
    </>
  )
}

export default ChangeProduct
