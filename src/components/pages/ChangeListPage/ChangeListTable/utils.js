import BooleanRenderer from "./BooleanRenderer";
import LinkRenderer from "./LinkRenderer";

// Utils

export const constructColumns = (payload) => {
    let columns = [];

    for (let column of payload.columns) {
        let type;
        let newColumn = { ...column };

        // for every row check every cell to determine the type
        for (let row of payload.rows)
            type = typeof (row['cells'][column.field]);

        if (!type)
            type = 'string';

        // if the column is boolean value render boolean icon
        if (type === 'boolean' && !payload.config.list_display_links.includes(column.field))
            newColumn['renderCell'] = BooleanRenderer;

        if (!payload.config.list_display_fields.includes(column.field))
            newColumn['sortable'] = false;

        // if the column is a link render a link to change page
        if (payload.config.list_display_links.includes(column.field))
            newColumn['renderCell'] = LinkRenderer;

        if (type === 'boolean') {
            newColumn['align'] = 'center';
        }
        else
            newColumn['align'] = 'left';

        columns.push({
            ...newColumn,
            type: type,
            flex: 1,
            minWidth: 200,
            headerAlign: 'left'
        });
    }

    // if there are now links in this table select the first column as link
    if (payload.config.list_display_links.length === 0)
        columns[0] = { ...columns[0], renderCell: LinkRenderer }

    return columns;
};

export const constructRows = (payload) => {
    let rows = [];
    let changeUrls = {};
    let has_id = false;

    // check if there is an id value in the rows
    for (let column of payload.columns) {
        try {
            has_id = column.field.id !== undefined ? true : false;
        } catch {
            has_id = false;
        }
    }

    // create a new row that only contains the cells in it
    for (let row of payload.rows) {
        let new_row = { ...row.cells };

        if (!has_id)
            new_row.id = row.id;

        // create an object containing the change urls of all the rows
        changeUrls[new_row.id] = row.change_url;

        rows.push(new_row);
    }


    return [rows, changeUrls];
};


export const filtersExists = (filters) => {
    let thereAreFilters = false;

    if (Object.keys(filters || {}).length > 0) {
        for (let filter of Object.values(filters)) {
            if (filter !== '?') {
                thereAreFilters = true;
            }
        }
    }

    return thereAreFilters;
};

const addQuery = (url, query) => {
    if (url[url.length - 1] === '&') {
        url += query.slice(1);
    } else {
        url += query;
    }

    return url;
}

export const constructUrl = ({ url, page, all, filters, sorting }) => {
    let newUrl = url;

    let thereAreFilters = filtersExists(filters);

    if (thereAreFilters) {
        for (let filter of Object.values(filters)) {
            if (filter !== '?') {
                newUrl = addQuery(newUrl, filter + '&');
            }
        }
    }

    if (sorting && sorting.length > 0) {
        let query = '?o=';

        for (let item of sorting) {
            let direction = item.sort === 'asc' ? '' : '-';
            query += `${direction}${item.fieldIndex + 1}.`
        }

        newUrl = addQuery(newUrl, query + '&');
    }

    if (!all) {
        newUrl = addQuery(newUrl, `?p=${page}`);
    } else {
        newUrl = addQuery(newUrl, '?all=')
    }

    return newUrl;
};