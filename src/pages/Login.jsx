import React from 'react';
import {
    Col,
    Image,
    Row,
    FloatingLabel,
    Form,
    Button,
    ListGroup,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { post } from '../apis/api';
import 'react-toastify/dist/ReactToastify.css';
import loginBg from '../assets/img/login-title.png';
import tick from '../assets/img/tick.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../assets/scss/main.scss';

const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
});

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const handlePostData = data => {
        login(data);
    };

    const login = async formData => {
        console.log(formData);
        const routeName = '/auth/login';
        try {
            const result = await post(routeName, formData);
            sessionStorage.setItem('token', result?.user?.token);
            sessionStorage.setItem('result', JSON.stringify(result?.user));
            toast.success(result?.message);
            setTimeout(() => {
                navigate('/category');
            }, 1000);
        } catch (err) {
            throw toast.error(err?.message);
        }
    };

    return (
        <div className="login-page bootstrap">
            <ToastContainer className="toast-common" />
            <div className="relative heading-sec">
                <Image src={loginBg} alt="login bg" />
                <h1 className="text-white absolute top-[50%] left-[50%] text-[40px] -translate-x-1/2 -translate-y-1/2">
                    Log In
                </h1>
            </div>
            <Form onSubmit={handleSubmit(handlePostData)}>
                <Row>
                    <Col xs={12} md={6} className="login-left">
                        <p>
                            <span>*</span>Required Field
                        </p>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="form-input mb-30"
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email-Id"
                                {...register('email')}
                                className={`form-control ${
                                    errors.email ? 'is-invalid' : ''
                                }`}
                            />
                            {errors.email && (
                                <Form.Text className="invalid-feedback">
                                    {errors.email?.message}
                                </Form.Text>
                            )}
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingPassword"
                            label="Password"
                            className="form-input mb-30"
                        >
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                {...register('password')}
                                className={`form-control ${
                                    errors.password ? 'is-invalid' : ''
                                }`}
                            />
                            {errors.password && (
                                <Form.Text className="invalid-feedback">
                                    {errors.password?.message}
                                </Form.Text>
                            )}
                        </FloatingLabel>
                        <a href="/" className="forgotten">
                            Forgotten password?
                        </a>
                        <Button className="btn-login w-100" type="submit">
                            Log in
                        </Button>
                    </Col>
                    <Col xs={12} md={6} className="login-right">
                        <h3>Why join Molton Brown?</h3>
                        <ListGroup>
                            <ListGroup.Item>
                                <Image src={tick} />
                                Check order history and status
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Image src={tick} />
                                Store and manage your delivery addresses
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Image src={tick} />
                                Update your personal preferences
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Image src={tick} />
                                Enjoy a speedier checkout!
                            </ListGroup.Item>
                        </ListGroup>
                        <Link className="btn-login2 w-100" to="/signup">
                            Sign Up
                        </Link>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Login;
