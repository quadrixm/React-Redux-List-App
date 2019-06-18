import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {filteredData} from "../actions/itemAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class FilterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStartTime: '',
            filterEndTime: '',
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            const filter = {
                name: this.state.filterName,
                startTime: this.state.filterStartTime,
                endTime: this.state.filterEndTime,
            }
            console.log(filter)
            this.props.filteredData(this.props.items, filter)
        });
    }

    render() {
        return (
            <Row>
                <Col lg={4}>
                    Name: <input placeholder={'Filter name'} name="filterName" value={this.state.filterName} onChange={this.handleOnChange}/>
                </Col>
                <Col lg={4}>
                    Start Date: <input type={'date'} name="filterStartTime" value={this.state.filterStartTime} onChange={this.handleOnChange}/>
                </Col>
                <Col lg={4}>
                    End Date: <input type={'date'} name="filterEndTime" value={this.state.filterEndTime} onChange={this.handleOnChange}/>
                </Col>
            </Row>
        )
    }
}

FilterForm.propTypes = {
    filteredData: PropTypes.func.isRequired,
}

const mapDispatchToProps = { filteredData }

export default connect(
    null,
    mapDispatchToProps
) (FilterForm)
