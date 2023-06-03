import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaWallet, FaShoppingCart, FaShoppingBag, FaUtensils, FaBook, FaUsers } from 'react-icons/fa';
import { BiMenu } from "react-icons/bi";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {
    const [cart] = useCart()

    // TODO: need to set user to state
    // const isAdmin = true;
    const [isAdmin] = useAdmin()

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content">

                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/home'><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/addItem'><FaUtensils></FaUtensils> Add Items </NavLink></li>
                            <li><NavLink to='/dashboard/manageItems'><BiMenu></BiMenu> Manage Items</NavLink></li>
                            <li><NavLink to='/dashboard/paymentHistory'><FaBook></FaBook> Manage Bookings</NavLink></li>
                            <li><NavLink to='/dashboard/allUsers'><FaUsers></FaUsers> All user</NavLink></li>


                        </> : <>
                            <li><NavLink to='/dashboard/home'><FaHome></FaHome> User Home</NavLink></li>
                            <li><NavLink to='/dashboard/reservation'><FaCalendarAlt></FaCalendarAlt> Reservation</NavLink></li>
                            <li><NavLink to='/dashboard/paymentHistory'><FaWallet></FaWallet> Payment History</NavLink></li>
                            <li>
                                <NavLink to='/dashboard/myCart'><FaShoppingCart></FaShoppingCart>
                                    My Cart
                                    <div className="badge bg-white border-0 text-black">{cart.length}</div>
                                </NavLink></li>

                        </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/menu'><BiMenu></BiMenu> Menu</NavLink></li>
                    <li><NavLink to="/order/salad"><FaShoppingBag></FaShoppingBag> Shop</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;