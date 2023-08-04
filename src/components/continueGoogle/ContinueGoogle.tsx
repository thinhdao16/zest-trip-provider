import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/joy'
import GoogleIcon from './GoogleIcon'
import { auth } from '../managementState/firebase/firebase';
import axios from 'axios';
import { DataContext } from '../managementState/dataContext/DataContext';
import clientId from "../continueGoogle/client_secret_624291541261-vsnpuqvrn48tah5ju43l048ug23a3hre.apps.googleusercontent.com.json"
function ContinueGoogle() {
    const { googleSignIn, accessToken } = React.useContext(DataContext)
    // const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            if (accessToken !== undefined) {
                // Thêm điều kiện kiểm tra accessToken
                const user = auth.currentUser;
                if (user) {
                    const idToken = await user.getIdToken();
                    const accessToken = await user.getIdToken(true);
                    const response = await axios.post(
                        "https://fhome2-be.vercel.app/login",
                        { accessToken: accessToken },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${idToken}`,
                            },
                        }
                    );
                    if ((response.status === 200)) {
                        // const data = await response.json();
                        if (
                            response !== undefined &&
                            response.data.data.user.roleName !== "admin" &&
                            response.data.data.user.status.user !== true
                        ) {
                            localStorage.setItem(
                                "access_token",
                                JSON.stringify(response.data)
                            );
                            // navigate("/home");
                            //         }
                        } else {
                            console.log("first")
                        }
                    } else {
                        console.log("first")
                    }
                } else {
                    console.log("first")
                }
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <>
            <Button
                variant="outlined"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                data-clientid={clientId.web.client_id}
            >
                Sign in with Google
            </Button>
        </>
    )
}

ContinueGoogle.propTypes = {}

export default ContinueGoogle
