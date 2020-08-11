import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import { PaginationPages } from '../components/PaginationPages';
import { getPageNumber, handleSetPage, getProducts } from '../helpers';
import { COPY, ITEMLIMIT, MAXLIMIT, NEXT } from '../constants';
import { Col, Row, Container, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import '../styles/App.css';

const Products = () => {
    const history = useHistory();
    const [next, setNext] = useState(NEXT);
    let [page, setPage] = useState(() => getPageNumber(setNext));
    const [itemsPerPage, setItemsPerPage] = useState(ITEMLIMIT);
    const [maxLimit, setMaxLimit] = useState(MAXLIMIT);
    const [filters, setFilters] = useState([]);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [data, setData] = useState({});
    const productInfo = {
        page, 
        itemsPerPage, 
        filters, 
        setData, 
        setResponseSuccess, 
        setMaxLimit
    }
    const pageInfo = {
        maxLimit, 
        page, 
        next,
        setPage, 
        setNext,
        history
    }

    const handleSearch = (event) => {
        getProducts(productInfo);
    }

    const handleCriteria = (event) => {
        setFilters([{ type: "all", values: [event.target.value] }])
    }

    useEffect(() => {
        getProducts(productInfo);
    // eslint-disable-next-line
    }, [responseSuccess, page, maxLimit]);

    return (
        <React.Fragment>
            <Container>
                <h1>{COPY.TITLE}</h1>
                <Row>
                    <Col>
                        <Pagination onClick={(event) => handleSetPage(event, pageInfo)}>
                            <Pagination.Item>{'first'}</Pagination.Item>
                            <Pagination.Item>{'prev'}</Pagination.Item>

                            { <PaginationPages next={next} /> }

                            <Pagination.Item>{'next'}</Pagination.Item>
                            <Pagination.Item>{'last'}</Pagination.Item>
                        </Pagination>
                    </Col>
                    <Col>
                    <InputGroup className="sm-3">
                        <FormControl
                            placeholder="Search..."
                            aria-label="Search terms"
                            aria-describedby="search"
                            onChange={(event) => handleCriteria(event)}
                        />
                        <InputGroup.Append>
                        <InputGroup.Text onClick={(event) => handleSearch(event)} id="search">Search</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    </Col>
                </Row>
                { !responseSuccess && !data.length && <h2>Loading...</h2> }
                { responseSuccess && data.length && data.map((item, i) => {
                        return <ProductItem key={i} item={item} />
                    })
                }
            </Container>
        </React.Fragment>
    );
};

export default Products;
