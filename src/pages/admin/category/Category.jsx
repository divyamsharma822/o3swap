import { useEffect, useState } from 'react';
import {
    Row,
    Dropdown,
    Button,
    DropdownButton,
    Form,
    Col,
    Modal,
} from 'react-bootstrap';
import defaultIcon from '../../../assets/icons/defaultSort.svg';
import closeIcon from '../../../assets/icons/close.svg';
import { remove, get, post, update } from '../../../apis/api';
import { NUMBER } from '../../../constant/number';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const coinSchema = Yup.object({
    coinName: Yup.string().required('Coin Name is required'),
    coinAddress: Yup.string().required('Coin Address is required'),
    insertedById: Yup.string().required('InsertedById is required'),
    pairedWithId: Yup.string().required('PairedWithId is required'),
    pairedWithAddress: Yup.string().required('PairedWithAddress is required'),
});

const Category = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver: yupResolver(coinSchema) });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [coin, setCoin] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        coinName: '',
        coinAddress: '',
        insertedById: '',
        pairedWithId: '',
        pairedWithAddress: '',
        isLive: false,
    });

    const [page, setPage] = useState(1);
    const [sorted, setSorted] = useState(false);

    // for deleting the row
    const [selectedItemId, setSelectedItemId] = useState(null);

    // for fetch the data
    useEffect(() => {
        if (selectedItemId) {
            remove(`/categories/${selectedItemId}`)
                .then(() => {
                    setSelectedItemId(null);
                    fetchCoinMater();
                })
                .catch(error => {
                    setSelectedItemId(null);
                    console.error('Error deleting item:', error);
                });
        }
    }, [selectedItemId]);

    const resetFormData = () => {
        setFormData({
            name: '',
            priority: '',
            status: '',
            logo: '',
        });
    };

    const apiRefresh = () => {
        fetchCoinMater(null, null, true);
        handleClose();
    };

    //for submiting data into database
    const handleInputChange = e => {
        const { name, value } = e.target;
        console.log({ [name]: value }, '[name]: value[name]: value');
        setFormData(pre => ({ ...pre, [name]: value }));
        setValue(e.target.name, e.target.value);
    };

    const handlePostData = data => {
        coinPostData(data);
    };

    const coinPostData = formData => {
        console.log('Coin formData Status ', formData.status);
        const routeName = !isEdit
            ? '/admin/coinMaster'
            : `/admin/coinMaster/${formData.id}`;
        if (!isEdit) {
            post(routeName, formData)
                .then(result => {
                    console.log('Coin data post successfully:', result);
                    resetFormData();
                    apiRefresh();
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            update(routeName, formData)
                .then(result => {
                    console.log('Category data edit successfully:', result);
                    resetFormData();
                    apiRefresh();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const fetchCoinMater = async (
        id,
        searchValue,
        isPaginate = true,
        pageData = 1,
        sort = 'name',
        sortBy = 'asc'
    ) => {
        let routeName = id ? `/admin/${id}` : '/admin';
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
            const coinData = await get(routeName);
            if (id) {
                setFormData({
                    id: coinData._id,
                    name: coinData.name,
                    priority: coinData.priority.toString(), // Convert to string if needed
                    status: coinData.status,
                    logo: coinData.logo,
                });
                setIsEdit(true);
                handleShow();
            } else {
                setCoin(coinData);
                setIsEdit(false);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const handleSort = name => {
        setSorted(!sorted);
        const sortBy = sorted ? 'asc' : 'desc';
        fetchCoinMater(null, null, true, page, name, sortBy);
    };

    // for fetch the data
    useEffect(() => {
        // Call the fetchData function
        fetchCoinMater(null, null, true);
    }, []);

    return (
        <>
            <div className="admin-common-body">
                <div className="admin-header-wrapper">
                    <h1 className="admin-header-title">Coin</h1>
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
                                Add Coin
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="list-container service-list-container">
                    <div className="table-wrapper mobile-optimised">
                        <div className="thead">
                            <div className="row tr">
                                <div className="th flex-table-column-10">
                                    <span className="table-heading">
                                        <span>Coin Name</span>
                                        <span
                                            className="icon-filter-custom"
                                            onClick={e => handleSort('name')}
                                        >
                                            <img
                                                src={defaultIcon}
                                                alt="filter icon"
                                            />
                                        </span>
                                    </span>
                                </div>
                                <div className="th flex-table-column-40">
                                    <span className="table-heading">
                                        <span>Coin Address</span>
                                    </span>
                                </div>
                                <div className="th flex-table-column-30">
                                    <span className="table-heading">
                                        <span>Inserted By Id</span>
                                        <span
                                            className="icon-filter-custom"
                                            onClick={e =>
                                                handleSort('priority')
                                            }
                                        >
                                            <img
                                                src={defaultIcon}
                                                alt="filter icon"
                                            />
                                        </span>
                                    </span>
                                </div>
                                <div className="th flex-table-column-10">
                                    <span className="table-heading">
                                        <span>IsLive</span>
                                    </span>
                                </div>
                                <div className="th flex-table-column-10 text-center">
                                    <span className="table-heading">
                                        <span>Action</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="tbody">
                            {coin?.result?.map((cat, index) => (
                                <div className="row tr" key={index + 1}>
                                    <div className="td flex-table-column-10">
                                        <p className="listing-title text-capitalize">
                                            {cat.coinName}
                                        </p>
                                    </div>
                                    <div className="td flex-table-column-40">
                                        <p className="listing-title text-capitalize">
                                            {cat.coinAddress}
                                        </p>
                                    </div>
                                    <div className="td flex-table-column-30">
                                        <div>
                                            <p className="listing-normal mb-0">
                                                {cat.insertedById}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="td flex-table-column-10">
                                        <p className="listing-normal mb-0">
                                            {cat.isLive.toString()}
                                        </p>
                                    </div>
                                    <div className="td flex-table-column-10">
                                        <div className="listing-normal">
                                            <div className="listing-normal text-center">
                                                <DropdownButton className="icon-three-dot manage-three-dot">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            fetchCoinMater(
                                                                cat._id
                                                            )
                                                        }
                                                    >
                                                        {' '}
                                                        Edit
                                                    </Dropdown.Item>
                                                    {/* <Dropdown.Item onClick={() => setSelectedItemId(cat._id)}> Edit</Dropdown.Item> */}
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            setSelectedItemId(
                                                                cat._id
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
            <Modal
                centered
                className="common-modal boarding-login"
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>{isEdit ? 'Update' : 'Add'} Coin</Modal.Title>
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
                                    <Form.Label>Enter Coin Name</Form.Label>
                                    <div className="wrap-input">
                                        <Form.Control
                                            type="type"
                                            placeholder="Enter coin name"
                                            id="coinName"
                                            name="coinName"
                                            value={formData.coinName}
                                            onChange={handleInputChange}
                                            {...register('coinName')}
                                            register="coinName"
                                            className={`form-control ${
                                                errors.coinName
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>Coin Address</Form.Label>
                                    <div className="wrap-input">
                                        <Form.Control
                                            type="type"
                                            placeholder="Enter Coin Address"
                                            id="coinAddress"
                                            name="coinAddress"
                                            value={formData.coinAddress}
                                            onChange={handleInputChange}
                                            {...register('coinAddress')}
                                            className={`form-control ${
                                                errors.coinAddress
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>Inserted By Id</Form.Label>
                                    <div className="wrap-input">
                                        <Form.Control
                                            type="type"
                                            placeholder="Enter Inserted Id"
                                            id="insertedById"
                                            name="insertedById"
                                            value={formData.insertedById}
                                            onChange={handleInputChange}
                                            {...register('insertedById')}
                                            className={`form-control ${
                                                errors.insertedById
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>Paired By Id</Form.Label>
                                    <div className="wrap-input">
                                        <Form.Control
                                            type="type"
                                            placeholder="Enter Paired Id"
                                            id="pairedWithId"
                                            name="pairedWithId"
                                            value={formData.pairedWithId}
                                            onChange={handleInputChange}
                                            {...register('pairedWithId')}
                                            className={`form-control ${
                                                errors.pairedWithId
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>Paired By Address</Form.Label>
                                    <div className="wrap-input">
                                        <Form.Control
                                            type="type"
                                            placeholder="Enter Paired Address"
                                            id="pairedWithAddress"
                                            name="pairedWithAddress"
                                            value={formData.pairedWithAddress}
                                            onChange={handleInputChange}
                                            {...register('pairedWithAddress')}
                                            className={`form-control ${
                                                errors.pairedWithAddress
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} className=" ">
                                <Form.Group className="form-mt-space">
                                    <Form.Label>IsLive</Form.Label>
                                    <div className="wrap-input">
                                        <Form.Control
                                            type="type"
                                            placeholder="IsLive"
                                            id="isLive"
                                            name="isLive"
                                            value={formData.isLive}
                                            onChange={handleInputChange}
                                            {...register('isLive')}
                                            className={`form-control ${
                                                errors.isLive
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            {/* <Col xs={12} sm={12} className=" ">
                                <div className="wrap-select wrap-input">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Group className="mb-3">
                                        <Form.Select {...register("status")} name="status" onChange={handleInputChange}>
                                            {!isEdit ? <option value="" default>Select Status</option> : ''}
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </Col> */}
                        </Row>
                        <div className="footer-modal">
                            <Button
                                type="submit"
                                className="btn primary modal-btn-submit"
                            >
                                {isEdit ? 'Update' : 'Add'}{' '}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer />
            </Modal>
        </>
    );
};

export default Category;
