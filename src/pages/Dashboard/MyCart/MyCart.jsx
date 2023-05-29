import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";


const MyCart = () => {
    const [cart, refetch] = useCart()
    const total = cart.reduce((sum, item) => item.price + sum, 0)

    const handleCartItemDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:4000/carts/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.deletedCount > 0){
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'success'
                            )
                        }
                    })
                
            }
        })

    }

    return (
        <div className="w-full px-8 max-h-full">
            <Helmet>
                <title>Bistro Boss | My Card</title>
            </Helmet>
            <div className="flex items-center justify-evenly uppercase my-8" >
                <h3 className="text-3xl">Total Items: {cart.length}</h3>
                <h3 className="text-3xl">Total Price: ${total}</h3>
                <button className="btn bg-[#D1A054] border-0">Pay</button>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr className="text-white">
                            <th className="bg-[#D1A054]">#</th>
                            <th className="bg-[#D1A054]">Image</th>
                            <th className="bg-[#D1A054]">Item Name</th>
                            <th className="bg-[#D1A054]">Price</th>
                            <th className="bg-[#D1A054]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>$ {item.price}</td>
                                    <td>
                                        <button onClick={() => handleCartItemDelete(item._id)} className="btn bg-red-700 border-0 btn-md text-2xl"><RiDeleteBin6Line></RiDeleteBin6Line></button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;