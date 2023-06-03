import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_token = import.meta.env.VITE_IMAGE_TOKEN;

const AddItem = () => {
    const { register, handleSubmit } = useForm();
    const [axiosSecure] = useAxiosSecure()
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`

    const onSubmit = data => {
        const formData = new FormData()
        formData.append('image', data.image[0])

        fetch(image_hosting_url, {
            method: "POST",
            body: formData
        })
        .then(res=>res.json())
        .then(imageResponse => {
            if(imageResponse.success){
                data.image = imageResponse.data.display_url;
                data.price = parseFloat(data.price)
                console.log(data);
                axiosSecure.post(`/menu`, data)
                .then(response => {
                    console.log(response.data);
                    if(response.data.insertedId){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Added to the menu',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })
    };



    return (
        <div className="w-full px-8 h-full mt-20">
            <Helmet>
                <title> Bistro Boss | Add Item</title>
            </Helmet>
            <SectionTitle heading="Add an item" subHeading="what's new"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" placeholder="Recipe Name" className="input input-bordered w-full" {...register('name', { required: true })} />
                    </div>
                    <div className="lg:flex">
                        <div className="form-control w-full mr-8" >
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={"Pick One"} className="select select-bordered" {...register('category', { required: true })}>
                                <option disabled>Pick One</option>
                                <option>Salad</option>
                                <option>Pizza</option>
                                <option>Soup</option>
                                <option>Dessert</option>
                                <option>Drinks</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" step="0.01" placeholder="Price" className="input input-bordered w-full" {...register('price', { required: true })} />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Recipe Details" {...register('recipe', { required: true })}></textarea>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Image*</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register('image', { required: true })} />
                    </div>
                    <input className="btn btn-sm mt-8" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddItem;