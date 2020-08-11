import React from 'react';
import { Pagination } from 'react-bootstrap';
import shortid from 'shortid';

export const PaginationPages = (props) => {
    const { next } = props;
    const startInt = next-9;
    const maxInt = next+1;
    const arr = [];
    
    for (let i = startInt; i < maxInt; i++) {
        arr.push(<Pagination.Item key={shortid.generate()}>{i}</Pagination.Item>)
    }

    return arr;
}
