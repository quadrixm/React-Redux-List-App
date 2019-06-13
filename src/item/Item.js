import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
class Item extends Component {
    render() {
        return (
            <Row>
                <Col lg={4}>{this.props.data.name}</Col>
                <Col lg={4}>{this.props.data.date.toLocaleDateString()}</Col>
                <Col lg={4}>{this.props.data.quantity}</Col>
            </Row>
        )
    }
}
export default Item
