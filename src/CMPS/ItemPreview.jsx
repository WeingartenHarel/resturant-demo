import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
import defaultImage from '../assets/default.jpg'
import plate from '../assets/plate.png'


export function ItemPreview({ item, handleSetOrder }) {
    let navigate = useNavigate();

    useEffect(() => {
        itemClass()
      }, [item]);
    
    const itemClass = ()=>{
        if (item.picked === 'picked'){
            return `item-container a${item.Diners.toString()} picked `;
        }else if(item.picked === 'standby'){
            return `item-container a${item.Diners.toString()} standby `;
        }else{
            return `item-container a${item.Diners.toString()} `
        }
    }

    const plates = ()=>{
        let elements = []
        for (let i = 0 ;i < item.Diners ; i ++){
            elements.push( <img src={plate} key={item.Table+i} className='img-plate' alt="plate"></img>)
        }
        return elements
    }

    return (
        <div className={`item`}>
            <Link to={`/item-details/${item.Table}`}>
                <div className={itemClass()}></div>
                <div className="imgs-container">{plates()}</div>
                <div className='item-details'>
                    <span>Table ID: {item.Table}</span>
                    <span>Numbers of diners: {item.Diners}</span>
                    <div>Can be connect to:{item.Concat.map(concat => <span key={concat}>{concat} |</span>)}</div>
                    {item.currOrder &&<div className='item-details'>
                        <span>mobile: {item.currOrder.Mobile} </span>
                        <span>Diners: {item.currOrder.Diners} </span>
                        <span>Date: {item.currOrder.startDate}</span>
                    </div>}
                </div>

            </Link>          
                {/* <div className='item-actions'>
                    <button className='button' value={item.Title}  onClick={()=> handleSetOrder(item) }>pick</button>
                </div>         */}
        </div>
    );
}
