import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions/category.actions';
import Layout from '../../Components/Layout';
import Input from '../../Components/UI/input'
import Modal from '../../Components/Modal/index'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import './style.css'
/**
 * @author
 * @function Category
 * */
const Category = (props) => {
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [expanded, setExpanded] = useState([]);
    const [checked, setChecked] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)

    const handleClose = () => {
        const form = new FormData();
        form.append("name", categoryName);
        form.append("parentId", parentCategoryId);
        form.append("categoryImage", categoryImage)
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const renderCategory = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    value: category._id,
                    label: category.name,
                    children: category.children.length > 0 && renderCategory(category.children)
                }

            )
        }
        return myCategories;
    }
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId

            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }
    const updateCategory = () => {
        setUpdateCategoryModal(true)
        const categories = createCategoryList(category.categories)
        const checkedArray = [];
        const expandedArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category)
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category)
        })
        setExpandedArray(expandedArray);
        setCheckedArray(checkedArray)

        console.log({ checked, expanded, categories, checkedArray, expandedArray })
    }
    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray)
        } else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedArray)
        }
    }
    return (
        <div >
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Category</h3>
                                <button onClick={handleShow}>Add</button>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            {/* <ul>{
                                renderCategory(category.categories)
                            }</ul> */}
                            <CheckboxTree
                                nodes={renderCategory(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />,

                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button>Delete</button>
                            <button onClick={updateCategory}>Edit</button>
                        </Col>
                    </Row>
                </Container>

                <Modal show={show} handleClose={handleClose} modalTitle={`Add New Category`}>
                    <Input value={categoryName} placeholder={`Category Name`} onChange={(e) => setCategoryName(e.target.value)} />
                    <select className="form-control" onChange={(e) => setParentCategoryId(e.target.value)} value={parentCategoryId}>
                        <option>Select Option</option>
                        {
                            createCategoryList(category.categories).map(option => (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            ))
                        }
                    </select>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Modal>
                {/* Edit categories */}
                <Modal show={updateCategoryModal} handleClose={() => setUpdateCategoryModal(false)} modalTitle={`Update Category`} size="lg">
                    <Row>
                        <Col>
                            <h6>Expanded</h6>
                        </Col>
                    </Row>
                    {
                        expandedArray.length > 0 &&
                        expandedArray.map((item, index) =>

                            <Row key={index}>

                                <Col>

                                    <Input value={item.name} placeholder={`Category Name`} onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')} />
                                </Col>
                                <Col>
                                    <select className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')} value={item.parentId}>
                                        <option>Select Option</option>
                                        {
                                            createCategoryList(category.categories).map(option => (
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            ))
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control">

                                        <option value="">Select Type</option>
                                        <option value="Store">Store</option>
                                        <option value="Product">Product</option>
                                        <option value="Page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }
                    <h6>Checked Category</h6>
                    {
                        checkedArray.length > 0 &&
                        checkedArray.map((item, index) =>

                            <Row key={index}>

                                <Col>

                                    <Input value={item.name} placeholder={`Category Name`} onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')} />
                                </Col>
                                <Col>
                                    <select className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')} value={item.parentId}>
                                        <option>Select Option</option>
                                        {
                                            createCategoryList(category.categories).map(option => (
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            ))
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control">

                                        <option value="">Select Type</option>
                                        <option value="Store">Store</option>
                                        <option value="Product">Product</option>
                                        <option value="Page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }





                    {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
                </Modal>
            </Layout>
        </div>
    );
}

export default Category;
