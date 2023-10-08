import React from 'react'
import {Form, message} from 'antd'
import Button from '../../components/Button';
import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LoginUser} from '../../apicalls/users';
import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {HideLoading, ShowLoading} from "../../redux/loadersSlice";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await LoginUser(values);
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                navigate("/");
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    return (<div className="h-screen bg-primary flex items-center justify-center">
        <div className="authentication-form bg-white p-3 rounded">
            <h1 className="text-secondary text 2xl font-bold mb-1">BLUESTONE LIBRARY-LOGIN</h1>
            <hr/>
            <Form layout="vertical"
                onFinish={onFinish}>

                <Form.Item 
                label="Email" 
                name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email"
                        },
                        ]}>
                    <input type="email" placeholder="Email" id="email"value={email}onChange={e => setEmail(e.targetvalue)}/>
                </Form.Item>
                
                <Form.Item 
                label="Password" 
                name="password"
                    rules={[
                        {
                                required: true,
                                message: "Please input your password"
                        },
                        ]}>
                    <input  type="password" placeholder="Password" id="password" value = {password}onChange = {e => setPassword(e.targetvalue)} />

                </Form.Item>


                <div className="text-center mt-2 flex flex-col gap-1">
                    <Button title="Login" type="submit"/>
                    <Link to='/register' className="text-primary text-sm underline">Do Not Have an Account? Click Here to Register</Link>
                </div>
            </Form>
        </div>
    </div>
    )
}

export default Login;
