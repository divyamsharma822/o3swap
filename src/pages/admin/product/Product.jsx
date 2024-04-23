import { useEffect, useState } from 'react';
import {
    Row,
    Dropdown,
    Button,
    Form,
    InputGroup,
    DropdownButton,
    Col,
    Modal,
} from 'react-bootstrap';
import defaultIcon from '../../../assets/icons/defaultSort.svg';
import closeIcon from '../../../assets/icons/close.svg';
import { remove, get, post, update } from '../../../apis/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NUMBER } from '../../../constant/number';
import '@assets/scss/main.scss';

const productSchema = Yup.object({
    productName: Yup.string().required('Product Name is required'),
    category: Yup.string().required('Select category'),
    subCategory: Yup.string().required('Select subCategory'),
    productImage: Yup.string().required('Product Image is required'),
    thumbnailImage: Yup.string().required('Thumbnail Image is required'),
    unit: Yup.string().required('Unit is required'),
    totalPrice: Yup.string().required('Total Price is required'),
    discountPrice: Yup.string().required('Discount Price is required'),
    shippingCost: Yup.string().required('Shipping Cost is required'),
    description: Yup.string().required('description is required'),
    status: Yup.string().required('Status is required'),
});

const Product = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(productSchema) });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [category, setCategory] = useState(null);
    const [product, setProduct] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        category: '',
        subCategory: '',
        productImage: '',
        thumbnailImage: '',
        unit: '',
        totalPrice: 0,
        discountPrice: 0,
        shippingCost: 0,
        status: '',
    });

    // for deleting the row
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [page, setPage] = useState(1);
    const [sorted, setSorted] = useState(false);

    // for fetch the data
    useEffect(() => {
        if (selectedItemId) {
            remove(`/product/${selectedItemId}`)
                .then(() => {
                    setSelectedItemId(null);
                    fetchProduct();
                })
                .catch(error => {
                    setSelectedItemId(null);
                    console.error('Error deleting item:', error);
                });
        }
    }, [selectedItemId]);

    const resetFormData = () => {
        setFormData({
            productName: '',
            description: '',
            category: '',
            subCategory: '',
            productImage: '',
            thumbnailImage: '',
            unit: '',
            totalPrice: '',
            discountPrice: '',
            shippingCost: '',
            status: '',
        });
    };

    const apiRefresh = () => {
        fetchProduct();
        handleClose();
    };

    //for submiting data into database
    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(pre => ({ ...pre, [name]: value }));
        console.log('sdsdfsd', formData);
    };

    const handlePostData = data => {
        productData(data);
    };

    const handleSort = name => {
        setSorted(!sorted);
        const sortBy = sorted ? 'asc' : 'desc';
        fetchProduct(null, null, true, page, name, sortBy);
    };

    const productData = formData => {
        const routeName = !isEdit ? '/product' : `/product/${formData.id}`;
        if (!isEdit) {
            post(routeName, formData)
                .then(result => {
                    console.log('Product added successfully:', result);
                    resetFormData();
                    apiRefresh();
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            update(routeName, formData)
                .then(result => {
                    console.log('Product edited successfully:', result);
                    resetFormData();
                    apiRefresh();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const fetchCategories = async () => {
        try {
            const result = await fetch('/categories?isPaginate=false');
            setCategory(result?.data);
        } catch (err) {
            throw err;
        }
    };

    const fetchProduct = async (
        id,
        searchValue,
        isPaginate = true,
        pageData = 1,
        sort = 'name',
        sortBy = 'asc'
    ) => {
        let routeName = id ? `/product/${id}` : '/product';
        if (searchValue && isPaginate) {
            routeName =
                routeName +
                `?filter=${searchValue}&page=${pageData}&limit=${NUMBER.TEN}&sort=${sort}&sortBy=${sortBy}&isPaginate=true`;
        } else if (isPaginate) {
            routeName =
                routeName +
                `?page=${pageData}&limit=${NUMBER.TEN}&sort=${sort}&sortBy=${sortBy}&isPaginate=true`;
        } else {
            routeName =
                routeName +
                `?filter=${searchValue}&sort=${sort}&sortBy=${sortBy}`;
        }
        try {
            const productData = await get(routeName);
            if (id) {
                setFormData({
                    id: productData._id,
                    category: productData.category,
                    subCategory: productData.subCategory,
                    productName: productData.productName,
                    productImage: productData.productImage,
                    thumbnailImage: productData.thumbnailImage,
                    unit: productData.unit,
                    totalPrice: productData.totalPrice,
                    discountPrice: productData.discountPrice,
                    shippingCost: productData.shippingCost,
                    description: productData.description,
                    status: productData.status,
                });
                setIsEdit(true);
                handleShow();
            } else {
                setProduct(productData?.data);
                setIsEdit(false);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    // for fetch the data
    useEffect(() => {
        // Call the fetchData function
        fetchProduct(null, null);
        fetchCategories();
    }, []);

    return (
        <>
            <div className="admin-right-main bootstrap">
                <div className="admin-common-body">
                    <div className="admin-header-wrapper">
                        <h1 className="admin-header-title">Product</h1>
                        <div className="header-wrapper">
                            <div className="header-left"></div>
                            <div className="header-right">
                                <Button
                                    className="btn primary header-primary-btn"
                                    onClick={() => {
                                        setIsEdit(false);
                                        resetFormData();
                                        handleShow();
                                    }}
                                >
                                    Add Product
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="list-container service-list-container">
                        <div className="table-wrapper mobile-optimised">
                            <div className="thead">
                                <div className="row tr">
                                    <div className="th flex-table-column-25">
                                        <span className="table-heading">
                                            <span>Name</span>
                                            <span
                                                className="icon-filter-custom"
                                                onClick={e =>
                                                    handleSort('productName')
                                                }
                                            >
                                                <img
                                                    src={defaultIcon}
                                                    alt="filter icon"
                                                />
                                            </span>
                                        </span>
                                    </div>
                                    <div className="th flex-table-column-25">
                                        <span className="table-heading">
                                            <span>Priority</span>
                                            <span
                                                className="icon-filter-custom"
                                                onClick={e =>
                                                    handleSort('unit')
                                                }
                                            >
                                                <img
                                                    src={defaultIcon}
                                                    alt="filter icon"
                                                />
                                            </span>
                                        </span>
                                    </div>
                                    <div className="th flex-table-column-35">
                                        <span className="table-heading">
                                            <span>Logo</span>
                                        </span>
                                    </div>
                                    <div className="th flex-table-column-15 text-center">
                                        <span className="table-heading">
                                            <span>Status</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="tbody">
                                {product?.map((item, index) => (
                                    <div className="row tr" key={index + 1}>
                                        <div className="td flex-table-column-25">
                                            <p className="listing-title text-capitalize">
                                                {item.productName}
                                            </p>
                                        </div>
                                        <div className="td flex-table-column-25">
                                            <div>
                                                <p className="listing-normal mb-0">
                                                    {item.unit}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="td flex-table-column-35">
                                            <img
                                                src={item.productImage}
                                                alt="Product images"
                                                width="50px"
                                                style={{ marginRight: 10 }}
                                            />
                                            <img
                                                src={item.thumbnailImage}
                                                alt="Thumbnail images"
                                                width="50px"
                                            />
                                        </div>
                                        <div className="td flex-table-column-15">
                                            <div className="listing-normal">
                                                <div className="listing-normal text-center">
                                                    <DropdownButton className="icon-three-dot manage-three-dot">
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                fetchProduct(
                                                                    item._id
                                                                )
                                                            }
                                                        >
                                                            {' '}
                                                            Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                setSelectedItemId(
                                                                    item._id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Dropdown.Item>
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                centered
                className="common-modal boarding-login"
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>
                        {isEdit ? 'Update' : 'Add'} Product
                    </Modal.Title>
                    <img
                        className="btn-close"
                        src={closeIcon}
                        alt="close icon"
                        onClick={() => {
                            resetFormData();
                            handleClose();
                        }}
                    />
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(handlePostData)}>
                        <Row className="modal-body-form">
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>Enter Product Name</Form.Label>
                                    <Form.Control
                                        type="type"
                                        placeholder="Enter Product Name"
                                        name="productName"
                                        // value={formData.productName}
                                        // onChange={handleInputChange}
                                        {...register('productName')}
                                        className={`form-control ${
                                            errors.productName
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Label>Category</Form.Label>
                                <Form.Group className="form-mt-space">
                                    <Form.Select
                                        {...register('category')}
                                        name="category"
                                        onChange={handleInputChange}
                                    >
                                        {!isEdit ? (
                                            <option value="" default>
                                                Select Category
                                            </option>
                                        ) : (
                                            ''
                                        )}
                                        {category?.map((cat, index) => (
                                            <option
                                                value={cat?._id}
                                                key={index + 1}
                                            >
                                                {cat?.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>
                                        Unit (eg. kg, grm, lit)
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter Unit"
                                        name="unit"
                                        // value={formData.unit}
                                        // onChange={handleInputChange}
                                        {...register('unit')}
                                        className={`form-control ${
                                            errors.unit ? 'is-invalid' : ''
                                        }`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>Total Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Total Price"
                                        name="totalPrice"
                                        // value={formData.totalPrice}
                                        // onChange={handleInputChange}
                                        {...register('totalPrice')}
                                        className={`form-control ${
                                            errors.totalPrice
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>Discount Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Discount Price"
                                        name="discountPrice"
                                        // value={formData.discountPrice}
                                        // onChange={handleInputChange}
                                        {...register('discountPrice')}
                                        className={`form-control ${
                                            errors.discountPrice
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>
                                        Shipping Cost (Optional)
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Shipping Cost"
                                        name="shippingCost"
                                        // value={formData.shippingCost}
                                        // onChange={handleInputChange}
                                        {...register('shippingCost')}
                                        className={`form-control ${
                                            errors.shippingCost
                                                ? 'is-invalid'
                                                : ''
                                        }`}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <div className="wrap-select wrap-input">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Group className="mb-3">
                                        <Form.Select
                                            {...register('status')}
                                            name="status"
                                            onChange={handleInputChange}
                                        >
                                            {!isEdit ? (
                                                <option value="" default>
                                                    Select Status
                                                </option>
                                            ) : (
                                                ''
                                            )}
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="inactive">
                                                Inactive
                                            </option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <div className="wrap-select wrap-input">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Group className="mb-3">
                                        <textarea
                                            rows={4}
                                            cols={40}
                                            name="description"
                                            // value={formData.description}
                                            // onChange={handleInputChange}
                                            {...register('description')}
                                            className={`form-control w-100 ${
                                                errors.description
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                        <div className="footer-modal">
                            <Button
                                type="submit"
                                className="btn primary modal-btn-submit"
                            >
                                {isEdit ? 'Update' : 'Add'} Product
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer />
            </Modal>
        </>
    );
};

export default Product;
