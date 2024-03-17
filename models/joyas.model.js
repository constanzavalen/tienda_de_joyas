import pool from '../database/config.js';
import format from 'pg-format';
import postQuery from '../helpers/filter.js';

export const getAllJoyas = async () => {
    const allJoyas = await pool.query('SELECT * FROM inventario');
    return allJoyas.rows;
};

//limit

export const getALLJoyasModelLimit = async (limits = 4) => {
    const allJoyas = await pool.query(
        'SELECT * FROM inventario ORDER BY id DESC LIMIT $1',
        [limits]
    );
    return allJoyas.rows;
};

//uso de pg format
export const getALLJoyasModelLimitFormat = async (
    order_by= 'id_DESC',
    limits= 2,
    page= 0
) => {
    
    const [atribute, direction] = order_by.split('_');
    const offset = page * limits;
    const allJoyas = format(
        'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
        atribute,
        direction,
        limits,
        offset
    );
    const response = await pool.query(allJoyas);
    return response.rows;
};

//hateoas
export const getAllJoyasHateoas = async () => {
    const allJoyas = await pool.query('SELECT * FROM inventario');
    return allJoyas.rows;
};


//filtros

export const getAllJoyasModelFilter = async (filters) => {
    const {query, values} = postQuery('inventario', filters);
    console.log(query);
    const result = await pool.query(query, values);
    return result.rows;
};


export const getJoyasFilterModel = async ({precio_max, precio_min, categoria, metal}) => {
    const filters = await pool.query('SELECT * FROM inventario WHERE precio <= $1 AND precio >= $2 AND categoria = $3 AND metal = $4',
    [precio_max, precio_min, categoria, metal]
    );
    return filters.rows;
};

