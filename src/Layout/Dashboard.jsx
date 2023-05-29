import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaWallet, FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { BiMenu } from "react-icons/bi";
import useCart from "../hooks/useCart";



const Dashboard = () => {
    const [cart] = useCart()
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
                    <li><NavLink to='/dashboard/home'><FaHome></FaHome> User Home</NavLink></li>
                    <li><NavLink to='/dashboard/reservation'><FaCalendarAlt></FaCalendarAlt> Reservation</NavLink></li>
                    <li><NavLink to='/dashboard/paymentHistory'><FaWallet></FaWallet> Payment History</NavLink></li>
                    <li>
                        <NavLink to='/dashboard/myCart'><FaShoppingCart></FaShoppingCart>
                            My Cart
                            <div className="badge bg-white border-0 text-black">{cart.length}</div>
                        </NavLink></li>
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