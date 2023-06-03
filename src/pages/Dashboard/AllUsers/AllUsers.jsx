import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaUserShield } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    // TODO: have to implement delete function
    const handleDelete = () => {

    }

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to make this user an Admin?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proceed!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:4000/users/admin/${user._id}`, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: `${user.name} is Admin now!`,
                                showConfirmButton: false,
                                timer: 1500
                              })
                        }
                    })
            }
        })
    }
    return (
        <div className="w-full px-8 h-full mt-20">
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <h1 className="text-3xl font-semibold uppercase my-8">Total Users: {users.length}</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr className="text-white">
                            <th className="bg-[#D1A054]">#</th>
                            <th className="bg-[#D1A054]">Name</th>
                            <th className="bg-[#D1A054]">Email</th>
                            <th className="bg-[#D1A054]">Role</th>
                            <th className="bg-[#D1A054]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ?
                                                'admin' :
                                                <button onClick={() => handleMakeAdmin(user)} className="btn bg-[#D1A054] border-0 btn-md text-2xl"><FaUserShield ></FaUserShield></button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn bg-red-700 border-0 btn-md text-2xl"><RiDeleteBin6Line></RiDeleteBin6Line></button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;