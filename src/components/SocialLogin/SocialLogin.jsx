import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {

    const { googleLogin } = useContext(AuthContext)
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
            })
    }

    return (
        <div>
            <div className="divider"></div>
            <div className="text-center my-4">
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline text-2xl">
                    <FcGoogle></FcGoogle>
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;