import React, { Component } from 'react'
import Item from "./Item";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {connect} from "react-redux";
import {fetchData, filteredData} from "../actions/itemAction";
import PropTypes from 'prop-types';

class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filterName: '',
            filterStartTime: '',
            filterEndTime: '',
        };

        this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
        this.handleFilterStartTimeChange = this.handleFilterStartTimeChange.bind(this);
        this.handleFilterEndTimeChange = this.handleFilterEndTimeChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchData();
    }

    handleFilterNameChange(e) {
        const inputVal = e.target.value;
        this.props.filteredData(inputVal, this.state.filterStartTime, this.props.filterEndTime)
        this.setState({filterName: inputVal})
    }

    handleFilterStartTimeChange(e) {
        const inputVal = e.target.value;
        this.props.filteredData(this.props.filterName, inputVal, this.props.filterEndTime)
        this.setState({filterStartTime: inputVal})
    }

    handleFilterEndTimeChange(e) {
        const inputVal = e.target.value;
        this.props.filteredData(this.props.filterName, this.props.filterStartTime, inputVal)
        this.setState({filterEndTime: inputVal})
    }

    render() {
        return (
            <Container>
                <Row>

                </Row>
                <Row>
                    <Col lg={4}>
                        Name: <input placeholder={'Filter name'} value={this.state.filterName} onChange={this.handleFilterNameChange}/>
                    </Col>
                    <Col lg={4}>
                        Start Date: <input type={'date'} value={this.state.filterStartTime} onChange={this.handleFilterStartTimeChange}/>
                    </Col>
                    <Col lg={4}>
                        End Date: <input type={'date'} value={this.state.filterEndTime} onChange={this.handleFilterEndTimeChange}/>
                    </Col>
                </Row>


                <Row>
                    <Col lg={4}>
                        <b>Name</b>
                    </Col>
                    <Col lg={4}>
                        <b>Date</b>
                    </Col>
                    <Col lg={4}>
                        <b>Quantity</b>
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
    filteredData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    filterName: PropTypes.string,
    filterStartTime: PropTypes.string,
    filterEndTime: PropTypes.string,
}

const mapStateToProps = (state) => ({
    items: state.data.items,
    filterName: state.data.filterName,
    filterStartTime: state.data.filterStartTime,
    filterEndTime: state.data.filterEndTime,
})

const mapDispatchToProps = { fetchData, filteredData }

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Items)
