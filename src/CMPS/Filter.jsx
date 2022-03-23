import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadItems,
    getById,
    setItem,
    removeItem,
    addItem,
    editItem,
    loadItemsCount,
} from '../store/actions/itemActions';

export function Filter({ filterBy, handleChangeSearch, onSetFilterTerm, handleChangeSort }) {
    const dispatch = useDispatch();

    return (
        <div className="actions">
            {/* <h2>Actions:</h2> */}
            <input className='input' value={filterBy.filter} onChange={handleChangeSearch} placeholder='search' />
            <select onChange={onSetFilterTerm} value={filterBy.term}>
                <option value="Title">Title</option>
                <option value="Domain">Domain</option>
                <option value="Description">Description</option>
            </select>
            <button className='button' value='' onClick={handleChangeSearch}>Clear</button>
            <button className='button' value=' ' onClick={handleChangeSort}>Sort</button>
        </div>
    );
}
