import { auth } from '../firebase/Firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import React, { useState } from 'react'
import axios from 'axios'

function Signup() {
    const [otp, setotp] = useState('')
    const [show, setshow] = useState(false)
    const [final, setfinal] = useState('')
    const [userData, setuserData] = useState({
        name: '',
        email: '',
        contact: ''
    })


    const SignUp = (e) => {
        e.preventDefault();

        if (userData.contact === "" || userData.contact.length < 10) return;
        const appVerifier = window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                this.onSignInSubmit();
            }
        }, auth);
        signInWithPhoneNumber(auth, "+91" + userData.contact, appVerifier)
            .then((result) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                setfinal(result);
                console.log("code sent")
                setshow(true);
            }).catch((error) => {
                alert(error)
            });
    }

    //ValidateOtp
    const ValidateOtp = (e) => {
        e.preventDefault();
        if (otp === null || final === null) return;
        final.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user.uid);

            CreateUser(user.uid)
        }).catch((error) => {
            alert(error);
        });
    }

    function CreateUser(userid) {
        axios.post("http://localhost:8080/api/signup/", {
            _id: userid,
            name: userData.name,
            contact: userData.contact,
            email: userData.email
        }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err.response.data.message)
        })
    }
    return (
        <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ "border_radius": "25px" }}>
                            <div className="card-body p-md-5">
                                <form className="mx-1 mx-md-4">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ display: !show ? "block" : "none" }}>

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>


                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    <input type="text" id="form3Example1c" className="form-control" onChange={(e) => setuserData({ ...userData, name: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    <input type="email" id="form3Example3c" className="form-control" onChange={(e) => setuserData({ ...userData, email: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4c">Your Contact No</label>
                                                    <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" id="form3Example4c" className="form-control" onChange={(e) => setuserData({ ...userData, contact: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" id='sign-in-button' onClick={SignUp}>Sign Up</button>
                                            </div>


                                        </div>

                                        {/*OTP Verification*/}
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ display: show ? "block" : "none" }}>

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">OTP Verification</p>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" onChange={(e) => setotp(e.target.value)} />
                                                    <label className="form-label" htmlFor="form3Example1c">Enter Otp</label>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={ValidateOtp}>Verify OTP</button>
                                            </div>
                                            {/*OTP Verification*/}

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup