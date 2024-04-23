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
import { Link, useNavigate } from 'react-router-dom';
import loginBg from '../assets/img/login-title.png';
import tick from '../assets/img/tick.png';
import { post } from '../apis/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../assets/scss/main.scss';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const signupSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Mobile number must be at least 6 characters')
        .max(12, 'Mobile number must not exceed 12 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(15, 'Password must not exceed 15 characters'),
});

const Signup = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(signupSchema) });

    const handlePostData = data => {
        signup(data);
    };

    const signup = async formData => {
        console.log(formData);
        const routeName = '/auth/signUp';
        try {
            const result = await post(routeName, formData);
            console.log('Signup successfully ', result?.message);
            toast.success(result?.message);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <div className="login-page bootstrap">
            <ToastContainer className="toast-common" />
            <div className="heading-sec">
                <Image src={loginBg} alt="login bg" />
                <h1>Sign Up</h1>
            </div>
            <Form onSubmit={handleSubmit(handlePostData)}>
                <Row>
                    <Col xs={12} md={6} className="login-left">
                        <p>
                            <span>*</span>Required Field
                        </p>
                        <FloatingLabel
                            controlId="firstName"
                            label="First Name"
                            className="form-input mb-30"
                        >
                            <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="Enter your firstName"
                                {...register('firstName')}
                                className={`form-control ${
                                    errors.firstName ? 'is-invalid' : ''
                                }`}
                            />
                            {errors.firstName && (
                                <Form.Text className="invalid-feedback">
                                    {errors.firstName?.message}
                                </Form.Text>
                            )}
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="lastName"
                            label="Last Name"
                            className="form-input mb-30"
                        >
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Enter your lastName"
                                {...register('lastName')}
                                className={`form-control ${
                                    errors.lastName ? 'is-invalid' : ''
                                }`}
                            />
                            {errors.lastName && (
                                <Form.Text className="invalid-feedback">
                                    {errors.lastName?.message}
                                </Form.Text>
                            )}
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="email"
                            label="Email address"
                            className="form-input mb-30"
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email-Id"
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
                            controlId="mobileNumber"
                            label="Mobile Number"
                            className="form-input mb-30"
                        >
                            <Form.Control
                                type="number"
                                name="mobileNumber"
                                placeholder="Enter your mobile number"
                                {...register('mobileNumber')}
                                className={`form-control ${
                                    errors.mobileNumber ? 'is-invalid' : ''
                                }`}
                            />
                            {errors.mobileNumber && (
                                <Form.Text className="invalid-feedback">
                                    {errors.mobileNumber?.message}
                                </Form.Text>
                            )}
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingPassword"
                            label="Password"
                            className="form-input mb-30"
                        >
                            <Form.Control
                                type="text"
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

                        <Button className="btn-login w-100" type="submit">
                            Sign Up
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
                        <Link className="btn-login2 w-100" to="/login">
                            Login
                        </Link>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Signup;
