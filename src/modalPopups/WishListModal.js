import "../assets/css/modal.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Col, Container, Row } from "reactstrap";
import Pagination from "react-js-pagination";

function WishListModal(props) {
    const [wishItem, setWishItem] = useState({
        item : "", price: ""
    });
    
    const handleChange = (e) => {
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newItem = { ...wishItem };
        newItem[fieldName] = fieldValue;

        setWishItem(newItem);
    }
    return (
        <div>
            <Modal {...props} size="lg" onHide={props.onHide} dialogClassName="wish-modal-container">
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        Wish List
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='wish-modal-body'>
                    <Container>
                        <Row className="row py-2 col col-md-4">
                            <Col xs={12} md={5}>
                                Enter Item: 
                            </Col>
                            <Col xs={6} md={4}>
                                <input name="item" onChange={handleChange} />
                            </Col>
                        </Row>
                        <Row className="row py-2 col col-md-4">
                            <Col xs={12} md={5}>
                                Enter Price: 
                            </Col>
                            <Col xs={6} md={4}>
                                <input name="price" onChange={handleChange} />
                            </Col>
                        </Row>
                        <Button className="row py-2 col col-md-1" style={{ marginLeft: '25%', marginRight:'75%' }} onClick={(e)=>{props.onSubmit(wishItem)}}>Add</Button>
                        Total Row: {props.count} row(s)<br></br>
                        <table className="modal-table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.details.map((item) => (
                                <tr key={item.id}>
                                    <td value={item.id}>{item.id}</td>
                                    <td value={item.item}>{item.item}</td>
                                    <td value={item.price}>{item.price}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table><br></br>
                        <div>
                            <Pagination className="pagination"
                                activePage={props.currentpage}
                                noOfPages={props.amountofpages}
                                itemsCountPerPage={props.itemsperpage}
                                totalItemsCount={Number(props.count)}
                                pageRangeDisplayed={props.pagerange}
                                onChange={(event, page) => props.onChange(page)}
                            />
                        </div>
                        
                        {/* <div style={{ marginLeft: "30%", marginRight: "30%" }}>
                            {props.pagenumbers.map((number) => (
                                <button type="submit" key={number} value={number} name="pageNumber" onClick={(e)=>{props.onClick(number)}}>{number}</button>
                            ))}
                        </div> */}
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default WishListModal;