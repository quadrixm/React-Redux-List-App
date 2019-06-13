import React, { Component } from 'react'
import Item from "./Item";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Items extends Component {

    constructor(props) {
        super(props);
        this.data = [
            {name: 'abc', date: new Date('2019-06-12'), quantity: 2},
            {name: 'xcv', date: new Date('2019-06-13'), quantity: 2},
            {name: 'xnv', date: new Date('2019-06-14'), quantity: 4},
            {name: 'xqv', date: new Date('2019-06-15'), quantity: 4},
        ];

        this.state = {
            items: this.data,
            filterName: ''
        };

        this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
        this.handleFilterStartTimeChange = this.handleFilterStartTimeChange.bind(this);
        this.handleFilterEndTimeChange = this.handleFilterEndTimeChange.bind(this);
        this.getFilteredData = this.getFilteredData.bind(this)
    }

    getFilteredData(name, start, end) {
        // let newItems = [];
        // if (start && end ) {
        //     const endTime = new Date(end);
        //     const startTime = new Date(start);
        //     newItems = this.data.filter(item => (item.date >= startTime && item.date <= endTime && item.name.includes(name)))
        // } else if (start) {
        //     const startTime = new Date(start);
        //     newItems = this.data.filter(item => (item.date >= startTime  && item.name.includes(name)))
        // } else if (end ) {
        //     const endTime = new Date(end);
        //     newItems = this.data.filter(item => (item.date <= endTime  && item.name.includes(name)))
        // } else {
        //     newItems = this.data.filter(item => (item.name.includes(name)))
        // }
        // return newItems;
        //
        // OR
        //
        return this.data.filter(
            item => ((start ? item.date >= new Date(start) : true)
                && (end ? item.date <= new Date(end): true)
                && item.name.includes(name))
        );
    }

    handleFilterNameChange(e) {
        const inputVal = e.target.value;
        let newItems = this.getFilteredData(inputVal, this.state.filterStartTime, this.state.filterEndTime);
        this.setState({filterName: inputVal, items: newItems})
    }

    handleFilterStartTimeChange(e) {
        const inputVal = e.target.value;
        let newItems = this.getFilteredData(this.state.filterName, inputVal, this.state.filterEndTime);
        this.setState({filterStartTime: inputVal, items: newItems})
    }

    handleFilterEndTimeChange(e) {
        const inputVal = e.target.value;
        let newItems = this.getFilteredData(this.state.filterName, this.state.filterStartTime, inputVal);
        this.setState({filterEndTime: inputVal, items: newItems})
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

                {this.state.items.map((item, key) =>
                    <Item data={item} key={item.name}/>
                )}
            </Container>
        )
    }
}
export default Items
