import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const AddItem = () => {
    const navigator = useNavigate()
    const { register, handleSubmit, reset } = useForm();


    const onSubmit = async (data) => {
        // console.log(data)
        const formData = new FormData();
        formData.append('image', data.image[0]);
        console.log(data.image[0], data)
        const response = await fetch(`${image_hosting_api}`, {
            method: "post",
            body: formData,
        });
        const result = await response.json()
        console.log(result, 'response imgbb')
        // console.log(hostingImg.data)
        if (result.success) {
            const menuItem = {
                name: data.name,
                // category: data.category,
                price: parseFloat(data.price),
                description: data.description,
                imageUrl: result.data.display_url
            };

            console.log(menuItem, "-------menuItem");

            fetch(`http://localhost:5000/api/products/`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItem),
                // body: menuItem,
            }).then((res) => {
                res.json().then(data => {
                    // setProductList(data)
                    reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Item is inserted successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(data, "product added")
                    navigator("/")
                })
            }).catch(e => { console.log('Error:', e) })


        }
    };

    return (
        <div className="w-full md:w-[870px] px-4 mx-auto">
            <h2 className="text-2xl font-semibold my-4">
                Upload A New <span className="text-green">Menu Item</span>
            </h2>

            {/* form here */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Recipe Name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* 2nd row */}
                    <div className="flex items-center gap-4">

                        {/* prices */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered h-24"
                            placeholder="Tell the worlds about your recipe"
                        ></textarea>
                    </div>

                    {/* 4th row */}
                    <div className="form-control w-full my-6">
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs"
                        />
                    </div>

                    <button className="btn bg-green-500 rounded text-white p-2">
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;