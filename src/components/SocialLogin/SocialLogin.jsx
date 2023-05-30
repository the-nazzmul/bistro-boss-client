import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {

    const { googleLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";


    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const saveUser = { name: result.user.displayName, email: result.user.email }
                fetch('http://localhost:4000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })

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