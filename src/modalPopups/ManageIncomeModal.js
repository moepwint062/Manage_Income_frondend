import React from "react";
import { Modal } from "react-bootstrap";

function ManageIncomeModal(props) {
    return (
        <div>
            <Modal {...props} size="lg" onHide={props.onHide} dialogClassName="saveincome-modal-content">
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        Manage Income
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='saveincome-modal-body'>
                    <table className="modal-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                                {props.details.map((list) => (
                                    <tr key={list.month}>
                                        <td value={list.month}>{list.month}</td>
                                        <td>{list.lists.map((item) => (item.item))}</td>
                                    </tr>
                                ))}
                            </tbody>
                    </table><br></br>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ManageIncomeModal;