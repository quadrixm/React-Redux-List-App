import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
class Item extends Component {

    constructor(props) {
        super(props);
        this.handleOnFileChange = this.handleOnFileChange.bind(this);
    }

    handleOnFileChange(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', e.target.files);
        axios.post(`http://localhost:8000/items/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        let photoItem = <input type="file" name="photo" onChange={this.handleOnFileChange} multiple />
        if (this.props.data.photo) {
            photoItem = <img width="100" height="100" src="{this.props.data.photo}"/>
        }
        return (
            <Row>
                <Col lg={3}>{this.props.data.name}</Col>
                <Col lg={3}>{this.props.data.date}</Col>
                <Col lg={3}>{this.props.data.quantity}</Col>
                <Col lg={3}>
                    {photoItem}
                </Col>
            </Row>
        )
    }
}
export default Item
