const pagination = (data, items, page) => {
    console.log(items, page);
    const pageInt = Number(page);
    const itemInt = Number(items);

    const startIndex = (pageInt - 1)*itemInt;
    const endIndex = pageInt*itemInt; 

    console.log(pageInt, itemInt, startIndex, endIndex);

    const result = {};
    if(endIndex < data.length) {
        result.next = {
            page: pageInt + 1,
            items: itemInt,
        };
    }
    if(startIndex > 0) {
        result.previous = {
            page: pageInt - 1,
            items: itemInt,
        };
    }
    result.result = data.slice(startIndex, endIndex);
    return result;
};

export default pagination;