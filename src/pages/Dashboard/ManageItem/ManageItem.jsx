import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const ManageItem = () => {
    return (
        <div className="w-full px-8 h-full mt-20">
            <Helmet>
                <title>Bistro Boss | Manage Items</title>
            </Helmet>
            <SectionTitle subHeading='hurry up' heading='Manage All Items'></SectionTitle>
            

        </div>
    );
};

export default ManageItem;