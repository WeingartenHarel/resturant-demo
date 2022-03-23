import HttpServicePwend from './HttpServicePwend.js'
import savedOrdersDB from './db/savedOrders.json'

export const savedOrdersService = {
    query,
    saveOrders
}

async function query(keyword) {
    try {
        return savedOrdersDB;   
    } catch {
        const err = 'error 500'
        return err
    }
}

async function saveOrders(savedOrders) {
    try {
        console.log('query',savedOrders)
        savedOrdersDB.push(savedOrders)       
        console.log('savedOrdersDB',savedOrdersDB)
    } catch {
        const err = 'error 500'
        return err
    }
}