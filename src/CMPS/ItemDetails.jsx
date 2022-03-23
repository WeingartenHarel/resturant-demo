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

export function ItemDetails() {
    const dispatch = useDispatch();
    let params = useParams();
    const currItem = useSelector((state) => state.itemReducer.currItem);
    const [pwndData, setPwndData] = useState()
    const viewTheme = useSelector((state) => state.themeReducer.viewTheme);

    useEffect(() => {
        async function fetchData() {
            console.log('params',params)
            await dispatch(getById(params.itemId))
        }
        fetchData()
    }, []);

    useEffect(() => {
        console.log('currItem',currItem)
    }, [currItem]); 

    // useEffect(() => {
    // }, [pwndData]);

    const FormView = () => {
        return (
            <div className={viewTheme ? "edit-container" : "edit-container dark "}>
                <div className={`item itemb ${currItem.Diners.toString()}`}>
                    <span>Table ID: {currItem.Table}</span>
                    <span>Numbers of diners: {currItem.Diners}</span>
                    <div>Can be connect to:{currItem.Concat.map(concat => <span>{concat} |</span>)}</div>
                    {currItem.currOrder &&<div className='item-details'>
                        <span>mobile: {currItem.currOrder.Mobile} </span>
                        <span>Diners: {currItem.currOrder.Diners} </span>
                        <span>Date: {currItem.currOrder.startDate}</span>
                    </div>}
                </div>
            </div>
        )
    }

    return (
        <div className={viewTheme ? "section-view-item" : "section-view-item dark "}>
            <Link className="link" to={`/`}> {'<'} Main </Link>
            <h2>Item Details</h2>
            {currItem && FormView()}
            
        </div>
    );
}
