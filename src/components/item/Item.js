import React, {Component} from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {addFile} from "../../actions/itemAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Img from 'react-image';

class Item extends Component {

    constructor(props) {
        super(props);
        this.handleOnFileChange = this.handleOnFileChange.bind(this);
    }

    handleOnFileChange(e) {
        e.preventDefault();
        this.props.addFile(e.target.files[0], this.props.data)
        e.target.value = '';
    }

    render() {
        if (this.props.data.hidden) {
            return null;
        }
        return (
            <Row>
                <Col lg={3}>{this.props.data.name}</Col>
                <Col lg={3}>{this.props.data.date}</Col>
                <Col lg={3}>{this.props.data.quantity}</Col>
                <Col lg={3}>
                    <div>
                        <Img width="100" height="100" src={this.props.data.photo}/>
                        <input type="file" name="photo" onChange={this.handleOnFileChange} multiple/>
                        <span>{this.props.data.file ? this.props.data.file.name : ''}</span>
                    </div>
                </Col>
            </Row>
        )
    }
}


Item.propTypes = {
    addFile: PropTypes.func.isRequired,
}

const mapDispatchToProps = {addFile}

export default connect(
    null,
    mapDispatchToProps
)(Item)
