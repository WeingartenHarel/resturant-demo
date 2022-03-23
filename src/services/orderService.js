import HttpServicePwend from './HttpServicePwend.js'
import order from './db/orders.json'

export const orderService = {
    query,

}

async function query(keyword) {
    try {
        return order;
       
    } catch {
        const err = 'error 500'
        return err
    }
}


