import HATEOAS from '../helpers/hateoas.js';
import pagination from '../helpers/pagination.js';
import { 
    getALLJoyasModelLimit, 
    getALLJoyasModelLimitFormat, 
    getAllJoyas, 
    getAllJoyasHateoas, 
    getAllJoyasModelFilter, 
    getJoyasFilterModel} from '../models/joyas.model.js';

//limit

export const getALLJoyasLimit = async (req, res) => {
    try {
        const {limit} = req.query;
        const result = await getALLJoyasModelLimit(limit);
        res.status(200).json({joya: result});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//pg format

export const getOrderAndLimitJoyas = async (req, res) => {
    try {
        const {order_by, limit, page} = req.query;
        let joyas;
        if (order_by || limit || page) {
            joyas = await getALLJoyasModelLimitFormat(order_by, limit, page);
        } else {
            joyas = await getALLJoyasModelLimit(limit);
        }
        res.status(200).json({joyas: joyas});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//hateoas

export const getAllJoyasWithHateoas = async (req, res) => {
    try {
        const allJoyas = await getAllJoyasHateoas();
        const getAllJoyasWithHateoas = await HATEOAS ('inventario', allJoyas);
        res.status(200).json({ joyas: getAllJoyasWithHateoas});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//paginator 

export const allJoyasPaginator = async (req, res) => {
    try {
        const {items, page} = req.query;
        if (!items || !page) {
            res.status(400).json({message: 'Invalid parameters'});
            return;
        }
        const allJoyas = await getAllJoyas();
        const isPage = /^[1-9]\d*$/.test(page); //Valida valor que se le entrega a page
        if(!isPage) {
            res.status(400).json({message: 'Invalid page number'});
            return;
        }
        console.log(items, page);
        const pageData = pagination(allJoyas, items, page);
        res.status(200).json(pageData);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}; 

// filtros
export const filterJoyas = async (req, res) => {
    try {
        const {items, page, filters} = req.body;
        console.log('filters', filters);
        const allJoyas = await getAllJoyasModelFilter(filters);
        console.log('allJoyas', allJoyas);
        const pageData = pagination(allJoyas, items, page);
        console.log('pageData', pageData);
        res.status(200).json(pageData);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


export const joyasFilter = async (req, res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;
    if (!precio_max || !precio_min || !categoria || !metal) {
        res.status(400).json({message: 'Invalid parameters'});
        return;
    }
    const joyasFilters = await getJoyasFilterModel({precio_max, precio_min, categoria, metal});
    res.status(200).json(joyasFilters);
    } catch (error) {
        console.error('Error al obtener las joyas filtradas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

};