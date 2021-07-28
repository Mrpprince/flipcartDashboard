import Layout from '../../Components/Layout';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Components/UI/input';
import { addProduct } from '../../actions';
import Modal from '../../Components/Modal/index'
import './style.css'
import { generatePublicUrl } from '../../urlConfig';
/**
 * @author
 * @function Products
 * */
const Products = (props) => {
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productPicture, setProductPicture] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const product = useSelector(state => state.product)
    const [productDetailsModal, setProductDetailsModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)

    const handleClose = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append('category', categoryId);
        for (let pic of productPicture) {
            form.append('productPicture', pic)
        }
        dispatch(addProduct(form))
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const renderCategory = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategory(category.children)}</ul>) : null}
                </li>
            )
        }
        return myCategories;
    }
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,

            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    const handleProductPicture = (e) => {
        setProductPicture([...productPicture, e.target.files[0]])
    }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>

                    </tr>
                </thead>
                <tbody>

                    {

                        product.products.length > 0 ?
                            product.products.map(product =>

                                <tr key={product._id} onClick={() => ShowProductDetailsModal(product)}>
                                    <td>1</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category?.name}</td>

                                </tr>
                            ) : null

                    }


                </tbody>
            </Table>);
    }
    const renderAddProductModal = () => {

        return (
            <Modal show={show} handleClose={handleClose} modalTitle={`Add New product`}>
                <Input value={name} placeholder={`Product Name`} onChange={(e) => setName(e.target.value)} />
                <Input value={quantity} placeholder={`quantity`} onChange={(e) => setQuantity(e.target.value)} />
                <Input value={price} placeholder={`price`} onChange={(e) => setPrice(e.target.value)} />
                <Input value={description} placeholder={`description`} onChange={(e) => setDescription(e.target.value)} />
                <select className="form-control" onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
                    <option>Select Option</option>
                    {
                        createCategoryList(category.categories).map(option => (
                            <option key={option.value} value={option.value}>{option.name}</option>
                        ))
                    }
                </select>
                {
                    productPicture.length > 0 ? productPicture.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }
                <input type="file" name="productPicture" onChange={handleProductPicture} />
            </Modal>
        );
    }
    const handleCloseProductDetailsModal = () => {
        setProductDetailsModal(false)
    }

    const ShowProductDetailsModal = (product) => {
        setProductDetails(product)
        console.log(product)
        setProductDetailsModal(true)
        const size = "lg"
    }

    const renderProductDetailsModal = () => {
        return (
            <Modal show={productDetailsModal} handleClose={handleCloseProductDetailsModal} modalTitle={`Product Details`}>
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className='value'>{productDetails?.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className='value'>{productDetails?.price}</p>
                    </Col>
                </Row>
                <Row>

                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className='value'>{productDetails?.price}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className='value'>{productDetails?.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className='value'>{productDetails?.description}</p>
                    </Col>
                    <Row>
                        <Col md="6">
                            <label className="key" >Product Picture</label>
                            <div  style={{ display: "flex" }}>
                                {
                                    productDetails?.productPictures.map(picture => (
                                        <div className="productImgContainer">
                                            <img src={generatePublicUrl(picture.img)} alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Modal >
        );
    }
    return (
        <Layout sidebar >
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Product</h3>
                            <button className="btn btn-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                        {renderProductDetailsModal()}
                    </Col>
                </Row>


            </Container>
            {renderAddProductModal()}
        </Layout>
    );
}

export default Products;
