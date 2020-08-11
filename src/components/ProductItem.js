
import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';

const ProductItem = (props) => {
    const { item } = props;

    return (
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>ID: { item.id }</Col>
                        <Col>Pages: { item.book_pages }</Col>
                    </Row>
                    <Row>
                        <Col>Title: { item.book_title }</Col>
                        <Col>Author: { item.book_author }</Col>
                    </Row>
                    <Row>
                        <Col>Location: { `${item.book_publication_city}, ${item.book_publication_country}`}</Col>
                        <Col>Published: { item.book_publication_year }</Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
    );
};

export default ProductItem;

