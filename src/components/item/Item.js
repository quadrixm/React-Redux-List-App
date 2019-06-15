import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import {addFile} from "../../actions/itemAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class Item extends Component {

    constructor(props) {
        super(props);
        this.handleOnFileChange = this.handleOnFileChange.bind(this);
    }

    handleOnFileChange(e) {
        e.preventDefault();
        this.props.addFile(e.target.files[0], this.props.data)
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



Item.propTypes = {
    addFile: PropTypes.func.isRequired,
}

const mapDispatchToProps = { addFile }

export default connect(
    null,
    mapDispatchToProps
) (Item)
