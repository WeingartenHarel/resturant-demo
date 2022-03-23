import React, { useState, useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
    loadItems,
    getById,
    setItem,
    setItemByID,
    removeItem,
    addItem,
    editItem,
    loadItemsCount,
} from '../store/actions/itemActions';
import { useParams } from "react-router-dom";


export function ItemEdit() {
    const dispatch = useDispatch();
    let params = useParams();
    const items = useSelector((state) => state.itemReducer.Items);
    const currItem = useSelector((state) => state.itemReducer.currItem);

    const [formData, setFormData] = useState({
        Title: '',
        Domain:''
    })

    useEffect(() => {
        async function fetchData() {
            await dispatch(getById(params.itemId))
          }
          fetchData()      
    }, []);

    useEffect(() => {
        console.log('currItem', items)

        localStorage.setItem('Items', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        if (currItem) {
            setFormData((prevState) => ({
                ...currItem,
                Title: currItem.Title,
                Domain:currItem.Domain
            }));
        }
    }, [currItem]);

    const handleAddItem = async (event) => {
        event.preventDefault();
        const field = event.target.name;
        const value = event.target.value;
        setFormData((prevState) => ({
            Title: '',
            Domain: '',
        }));
    }

    const handleChange = async (event) => {
        event.preventDefault();
        const field = event.target.name;
        const value = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            [field]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        (currItem) ? await dispatch(editItem(formData)) : await dispatch(addItem(formData))
    }

    const FormEdit = () => {
        return (
            <div className="edit-container">
                <form>
                    <div className="item">
                        <img src={currItem.LogoPath} className='item-img' alt='img' />
                        <input className='input' value={formData.Title} onChange={handleChange}
                            placeholder='Title' name='Title' type='text' />
                        <input className='input' value={formData.Domain} onChange={handleChange}
                            placeholder='Domain' name='Domain' type='text' />
                        <button className='button' onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="section-view-item">
            <Link to={`/`}> Main </Link> |{" "}
            <h2>Add / Edit List:</h2>
            <button className='button' onClick={handleAddItem}>Add New Item</button>
            {currItem && FormEdit()}

        </div>
    );
}
