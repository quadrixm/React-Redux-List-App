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
        // this.data = [
        //     {name: 'abc', date: new Date('2019-06-12'), quantity: 2},
        //     {name: 'xcv', date: new Date('2019-06-13'), quantity: 2},
        //     {name: 'xnv', date: new Date('2019-06-14'), quantity: 4},
        //     {name: 'xqv', date: new Date('2019-06-15'), quantity: 4},
        // ];
        //
        this.state = {
            items: [],
            filterName: '',
            filterStartTime: '',
            filterEndTime: '',
        };

        // this.props.fetchData()

        this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
        this.handleFilterStartTimeChange = this.handleFilterStartTimeChange.bind(this);
        this.handleFilterEndTimeChange = this.handleFilterEndTimeChange.bind(this);
        // this.getFilteredData = this.getFilteredData.bind(this)
    }

    componentWillMount() {
        this.props.fetchData();
    }

    // componentDidMount() {
    //     fetch('http://127.0.0.1:8000/items/?format=json')
    //         .then(data => {
    //             console.log(data)
    //             this.setState({items: data.results})
    //         });
    // }

    // componentDidMount() {
    //     fetch("http://127.0.0.1:8000/items/")
    //         .then(response => response.clone().json())
    //         .then(data => console.log(data))
    //         .catch(ex => console.log('parsing failed', ex));
    // }

    // getFilteredData(name, start, end) {
    //     // let newItems = [];
    //     // if (start && end ) {
    //     //     const endTime = new Date(end);
    //     //     const startTime = new Date(start);
    //     //     newItems = this.data.filter(item => (item.date >= startTime && item.date <= endTime && item.name.includes(name)))
    //     // } else if (start) {
    //     //     const startTime = new Date(start);
    //     //     newItems = this.data.filter(item => (item.date >= startTime  && item.name.includes(name)))
    //     // } else if (end ) {
    //     //     const endTime = new Date(end);
    //     //     newItems = this.data.filter(item => (item.date <= endTime  && item.name.includes(name)))
    //     // } else {
    //     //     newItems = this.data.filter(item => (item.name.includes(name)))
    //     // }
    //     // return newItems;
    //     //
    //     // OR
    //     //
    //     return this.data.filter(
    //         item => ((start ? item.date >= new Date(start) : true)
    //             && (end ? item.date <= new Date(end): true)
    //             && item.name.includes(name))
    //     );
    // }

    handleFilterNameChange(e) {
        const inputVal = e.target.value;
        this.props.filteredData(inputVal, this.state.filterStartTime, this.props.filterEndTime)
        // let newItems = this.getFilteredData(inputVal, this.state.filterStartTime, this.state.filterEndTime);
        this.setState({filterName: inputVal, items: this.props.items})
    }

    handleFilterStartTimeChange(e) {
        const inputVal = e.target.value;
        this.props.filteredData(this.props.filterName, inputVal, this.props.filterEndTime)
        // let newItems = this.getFilteredData(this.state.filterName, inputVal, this.state.filterEndTime);
        this.setState({filterStartTime: inputVal, items: this.props.items})
    }

    handleFilterEndTimeChange(e) {
        const inputVal = e.target.value;
        this.props.filteredData(this.props.filterName, this.props.filterStartTime, inputVal)
        // let newItems = this.getFilteredData(this.state.filterName, this.state.filterStartTime, inputVal);
        this.setState({filterEndTime: inputVal, items: this.props.items})
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

const mapStateToProps = (state /*, ownProps*/) => ({
    items: state.items,
    filterName: state.filterName,
    filterStartTime: state.filterStartTime,
    filterEndTime: state.filterEndTime
})

const mapDispatchToProps = { fetchData, filteredData }

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Items)
