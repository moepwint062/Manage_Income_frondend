import React, { useState } from 'react';
import { LOGIN_URL } from '../../constants/api.path';
import '../../assets/css/styles.css';

function Login() {
    const [email, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    async function userLogin(e) {
        e.preventDefault();
        let myData = { email, password };
        if (email !== "" && password !== "") {
            await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(myData)
            }).then(async response => {
                if (!response.ok) {
                    const res = await response.json();
                    localStorage.setItem("isLoggedIn", false);
                    setErrors(res.message);
                } else {
                    const resultInJson = await response.json();
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("token", resultInJson.token);
                    localStorage.setItem("userName", resultInJson.name);
                    window.location.href = "/home";
                }
            })
        }
    }
    return (
        <div className="row justify-content-center main--body" id="mainbody">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form onSubmit={userLogin}>
                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label">Email Address</label>
                                <div className="col-md-6">
                                    <input id="emailAddress" type="email" className="form-control" value={email} required autoFocus onChange={e => setEmailAddress(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-md-4 col-form-label">Password</label>
                                <div className="col-md-6">
                                    <input id="password" type="password" className="form-control" value={password} required onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6 offset-md-4">
                                    {errors && (<span className='error'>{errors}</span>)}
                                </div>
                            </div>
                            <div className="row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type='submit' className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
