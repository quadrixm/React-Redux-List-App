import React, { Component } from 'react'
import Item from "./Item";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Items extends Component {

    constructor(props) {
        super(props);
        this.data = [
            {id: 'abc', date: new Date('2019-06-12'), quantity: 2},
            {id: 'xcv', date: new Date('2019-06-13'), quantity: 2},
            {id: 'xnv', date: new Date('2019-06-14'), quantity: 4},
            {id: 'xqv', date: new Date('2019-06-15'), quantity: 4},
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
        let newItems = [];
        if (start && end ) {
            const endTime = new Date(end);
            const startTime = new Date(start);
            newItems = this.data.filter(item => (item.date >= startTime && item.date <= endTime && item.id.includes(name)))
        } else if (start) {
            const startTime = new Date(start);
            newItems = this.data.filter(item => (item.date >= startTime  && item.id.includes(name)))
        } else if (end ) {
            const endTime = new Date(end);
            newItems = this.data.filter(item => (item.date <= endTime  && item.id.includes(name)))
        } else {
            newItems = this.data.filter(item => (item.id.includes(name)))
        }
        return newItems;
    }

    handleFilterNameChange(e) {
        const inputVal = e.target.value;
        let newItems = this.getFilteredData(inputVal, this.state.filterStartTime, this.state.filterEndTime);
        this.setState({filterName: inputVal, items: newItems})
    }

    handleFilterStartTimeChange(e) {
        const inputVal = e.target.value;
        // const startTime = new Date(inputVal);
        let newItems = this.getFilteredData(this.state.filterName, inputVal, this.state.filterEndTime);
        // if (this.state.filterEndTime) {
        //     const endTime = new Date(this.state.filterEndTime)
        //     newItems = this.data.filter(item => (item.date >= startTime && item.date <= endTime && item.id.includes(this.state.filterName)))
        // } else {
        //     newItems = this.data.filter(item => (item.date >= startTime && item.id.includes(this.state.filterName)))
        // }
        this.setState({filterStartTime: inputVal, items: newItems})
    }

    handleFilterEndTimeChange(e) {
        const inputVal = e.target.value;
        // const endTime = new Date(inputVal);
        let newItems = this.getFilteredData(this.state.filterName, this.state.filterStartTime, inputVal);
        // if (this.state.filterStartTime) {
        //     const startTime = new Date(this.state.filterStartTime);
        //     newItems = this.data.filter(item => (item.date >= startTime && item.date <= endTime && item.id.includes(this.state.filterName)))
        // } else {
        //     newItems = this.data.filter(item => (item.date <= endTime  && item.id.includes(this.state.filterName)))
        // }
        this.setState({filterEndTime: inputVal, items: newItems})
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg={4}>
                        <input placeholder={'Filter name'} value={this.state.filterName} onChange={this.handleFilterNameChange}/>
                    </Col>
                    <Col lg={4}>
                        <input type={'date'} value={this.state.filterStartTime} onChange={this.handleFilterStartTimeChange}/>
                    </Col>
                    <Col lg={4}>
                        <input type={'date'} value={this.state.filterEndTime} onChange={this.handleFilterEndTimeChange}/>
                    </Col>
                </Row>

                {this.state.items.map((item, key) =>
                    <Item data={item} key={item.id}/>
                )}
            </Container>
        )
    }
}
export default Items
