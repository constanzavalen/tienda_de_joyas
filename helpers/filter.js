const postQuery = (entity, filters) => {
    const table = entity.toLowerCase();
    let query = `SELECT * FROM ${table} WHERE 1 = 1`;
    const filterEntries = Object.entries(filters);
    const values = [];

    for(const [key, value] of filterEntries) {
        query += ` AND ${key} = $${values.length + 1}`;
        values.push(value);
        console.log(values);
    }
    return {query, values};
};

export default postQuery;