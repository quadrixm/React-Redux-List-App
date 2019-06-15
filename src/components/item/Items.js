import React, { Component } from 'react'
import Item from "./Item";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import {fetchData} from "../../actions/itemAction";
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
    }

    componentWillMount() {
        this.props.fetchData();
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
                        <b>Photo</b>
                    </Col>
                </Row>

                {this.props.items.map((item, key) =>
                    <Item data={item} key={item.name}/>
                )}

            </Container>
        )
    }
}

Items.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    allItems: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    items: state.data.filterItems,
    allItems: state.data.items,
})

const mapDispatchToProps = { fetchData }

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Items)
