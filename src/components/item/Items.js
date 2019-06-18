import React, { Component } from 'react'
import Item from "./Item";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import {fetchData, uploadFiles} from "../../actions/itemAction";
import PropTypes from 'prop-types';
import FilterForm from "../FilterForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };

        this.handleUploadClick = this.handleUploadClick.bind(this)
    }

    componentWillMount() {
        this.props.fetchData();
    }

    handleUploadClick(e) {
        this.props.uploadFiles(this.props.items)
    }

    render() {
        return (
            <Container>

                <hr/>

                <FilterForm items={this.props.items} />

                <hr/>

                <Row>
                    <Col lg={3}>
                        <b>Name</b>
                    </Col>
                    <Col lg={3}>
                        <b>Date</b>
                    </Col>
                    <Col lg={3}>
                        <b>Quantity</b>
                    </Col>
                    <Col lg={3}>
                        <button onClick={this.handleUploadClick}>Upload</button>
                    </Col>
                </Row>

                {this.props.items.map((item, key) =>
                    <Item data={item} key={key}/>
                )}

            </Container>
        )
    }
}

Items.propTypes = {
    fetchData: PropTypes.func.isRequired,
    uploadFiles: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    items: state.data.items,
})

const mapDispatchToProps = { fetchData, uploadFiles }

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Items)
