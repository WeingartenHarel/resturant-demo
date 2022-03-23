import HttpService from './HttpServiceItem.js'
import floor from './db/floor.json'
export const itemService = {
    query,
    getById,
    remove,
    save,
    update,
}

async function query(filterBy,pageNumber,isSort) {
    try {
        return floor;
       
    } catch {
        const err = 'error 500'
        return err
    }
}

function getById(itemId) {
    // return HttpService.get(`item/${itemId}`);
}

function remove(itemId) {
    // return HttpService.delete(`item/${itemId}`);
}

function save(item) {
    // return HttpService.post('item', item)
}

function update(item) {
    // return HttpService.put(`item/${item._id}`, item);
}

const filterQuery = (arr, filterBy) => {
    const term = filterBy.term
    const filter = filterBy.filter
    const dbQueryFiltered = arr.filter(item => {
        return item[term] === filter || item[term].toLowerCase().includes(filter.toLowerCase())
    })
    return dbQueryFiltered;
}

const sortQuery = (dbQueryFiltered, isSort, filterBY) => {
    let sortedArray = dbQueryFiltered.sort((a, b) => {
        let nameA = a[filterBY].toUpperCase(); // ignore upper and lowercase
        let nameB = b[filterBY].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return isSort ? -1 : 1;
        }
        if (nameA > nameB) {
            return isSort ? 1 : -1;
        }
        // names must be equal
        return 0;
    })
    return sortedArray;

}

const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

const findById = (arr, itemId) => {
    const index = arr.findIndex(item => item.id === itemId)
    return index
}

const makeId = (length = 5) => {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}