import React, { useState } from 'react'
import { auth } from '../firebase/Firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import axios from 'axios'

function Login() {
    const [otp, setotp] = useState('')
    const [show, setshow] = useState(false)
    const [final, setfinal] = useState('')
    const [Contact, setContact] = useState('')

    const SignIN = (e) => {
        e.preventDefault();

        if (Contact === "" || Contact.length < 10) return;

        const result =login(Contact)
        if (!result) {

            const appVerifier = window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    this.onSignInSubmit();
                }
            }, auth);
            signInWithPhoneNumber(auth, "+91" + Contact, appVerifier)
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
    }

    //OTP Verification
    const ValidateOtp = (e) => {
        e.preventDefault();
        if (otp === null || final === null) return;
        final.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user.uid);

            login(user.uid)
        }).catch((error) => {
            alert(error);
        });
    }

    function login(userid) {
        axios.post("http://localhost:8080/api/auth/", {
            _id: userid,
            contact: Contact
        }).then((response) => {
            console.log(response.data)
            return true;
        }).catch((err) => {
            console.log(err.response.data.message)
            return false;
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

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4c">Your Contact No</label>
                                                    <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" id="form3Example4c" className="form-control" onChange={(e) => setContact(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" id='sign-in-button' onClick={SignIN}>Sign In</button>
                                            </div>


                                        </div>

                                        {/*OTP Verification*/}
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ display: show ? "block" : "none" }}>

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">OTP Verification</p>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example1c">Enter Otp</label>
                                                    <input type="text" id="form3Example1c" className="form-control" onChange={(e) => setotp(e.target.value)} />
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

export default Login
