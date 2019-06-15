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
        e.preventDefault();
        this.props.uploadFiles(this.props.allItems)
        // const formData = new FormData();
        // formData.append('files', e.target.files[0]);
        // axios.post(`http://localhost:8000/upload/`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then(response => {
        //     console.log(response)
        // }).catch(error => {
        //     console.log(error)
        // });
    }

    render() {
        return (
            <Container>

                <hr/>

                <FilterForm allItems={this.props.allItems} />

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
    allItems: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    items: state.data.filterItems,
    allItems: state.data.items,
})

const mapDispatchToProps = { fetchData, uploadFiles }

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Items)
