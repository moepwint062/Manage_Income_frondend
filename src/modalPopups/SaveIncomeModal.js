import "../assets/css/modal.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Col, Container, Row } from "reactstrap";

function SaveIncomeModal(props) {
    const [amount, setAmount] = useState({
        income : ""
    });
    
    const handleChange = (e) => {
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newAmount = { ...amount };
        newAmount[fieldName] = fieldValue;

        setAmount(newAmount);
    }
    return (
        <div>
            <Modal {...props} size="lg" onHide={props.onHide} dialogClassName="saveincome-modal-content">
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        Save Income
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='saveincome-modal-body'>
                    <Container>
                        <Row align="center">
                            <Col xs={12} md={6}>
                                Enter Monthly Income Amount: 
                            </Col>
                            <Col xs={6} md={6}>
                                <input name="income" onChange={handleChange} />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ marginLeft: '50%', marginRight:'50%' }} onClick={(e)=>{props.onSubmit(amount)}}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SaveIncomeModal;