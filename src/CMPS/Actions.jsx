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

export function Actions({  onChangeView , onChangeTheme, view }) {
    const dispatch = useDispatch();
    const viewTheme = useSelector((state) => state.themeReducer.viewTheme);


    return (
        <div className="items-filter">
            <button className='button button-view colorC' value={view} onClick={onChangeView}>Toogle {view ? 'Grid' : 'list '}</button>
            <button className={viewTheme ? 'button button-view colorC' : 'button button-view dark colorC'} value={view} onClick={onChangeTheme}>Toogle {viewTheme ? 'Dark' : 'Light '}</button>
        </div>
    );
}
