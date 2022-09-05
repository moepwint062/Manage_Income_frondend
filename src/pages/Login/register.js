import React, { useState } from 'react';
import { REGISTER_URL } from '../../constants/api.path';

function Register() {
    const [ name, setName ] = useState("");
    const [ email, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ password_confirmation, setPasswordConfirmation ] = useState("");
    const [errors, setErrors] = useState("");

    async function userRegister(e) {
        e.preventDefault();
        let myData = { name, email, password, password_confirmation };
        if (name !== "" && email !== "" && password !== "" && password_confirmation !== "") {
            await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(myData)
            }).then(async response => {
                if(!response.ok) {
                    const res = await response.json();
                    localStorage.setItem("isRegistered", false);
                    setErrors(res.message);
                } else {
                    localStorage.setItem("isRegistered", true);
                    window.location.href = "/login";
                }
            });
        }
    }

    return (
        <div className="row justify-content-center main--body" id="mainbody">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={userRegister}>
                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label">Name</label>
                                <div className="col-md-6">
                                    <input id="name" type="text" className="form-control" placeholder="Enter your name" value={name} required autoFocus onChange={e => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label">Email Address</label>
                                <div className="col-md-6">
                                    <input id="emailAddress" type="email" className="form-control" placeholder="Enter your email" value={email} required autoFocus onChange={e => setEmailAddress(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label">Password</label>
                                <div className="col-md-6">
                                    <input id="password" type="password" className="form-control" placeholder="Create password" value={password} required onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label">Confirmation Password</label>
                                <div className="col-md-6">
                                    <input id="confirm_password" type="password" className="form-control" placeholder="Type password again" value={password_confirmation} required onChange={e => setPasswordConfirmation(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6 offset-md-4">
                                    {errors && (<span className='error'>{errors}</span>)}
                                </div>
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-8 offset-md-4">
                                <button type='submit' className="btn btn-primary">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;