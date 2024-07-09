import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    
    let navigator=useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
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
        console.log(formData)
        fetch(`http://localhost:5000/api/products/`, {
            method: "post",
            // body: JSON.stringify(form),
            headers:{
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
       
        <div className="max-w-sm mx-auto my-8 p-4 bg-white rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
            />

            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
            />

            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
                rows="1"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
            ></textarea>

            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
                type="file"
                // accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
            />

            <button
                type="submit"
                className="bg-[#ff59cd] text-white w-full py-2 px-4 border border-transparent rounded-md shadow-sm   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add Product
            </button>
        </form>
    </div>
    )
}

export default AddProduct
