import React, { useState, useEffect, useRef } from 'react';
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
    removeItem,
    addItem,
    editItem,
    loadItemsCount,
    chooseItem,
} from '../store/actions/itemActions';
import { ItemPreview } from './ItemPreview';



export function ItemList({ items, view ,handleSetOrder}) {
    const dispatch = useDispatch();
    const currItem = useSelector((state) => state.itemReducer.currItem);
    const elementRef = useRef();

    const List = () => {
        return (
            items.map(item => {
                return (<div className={`item-container` } key={item.Table}>
                    <ItemPreview item={item} currItem={currItem} 
                     handleSetOrder={handleSetOrder}
                    />
                </div >)
            })
        )
    }

    return (
        <div className="items-section">
            <h2>Tables List:</h2>
            <div className={view ? "items-container" : "items-container grid"}>
                {List()}
            </div>
        </div>
    );
}
