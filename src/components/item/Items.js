import React, { Component } from 'react'
import Item from "./Item";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import {fetchData} from "../../actions/itemAction";
import PropTypes from 'prop-types';
import FilterForm from "../FilterForm";

class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            // filterName: '',
            // filterStartTime: '',
            // filterEndTime: '',
        };

        // this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
        // this.handleFilterStartTimeChange = this.handleFilterStartTimeChange.bind(this);
        // this.handleFilterEndTimeChange = this.handleFilterEndTimeChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchData();
    }

    // handleFilterNameChange(e) {
    //     const inputVal = e.target.value;
    //     this.props.filteredData(inputVal, this.state.filterStartTime, this.props.filterEndTime)
    //     this.setState({filterName: inputVal})
    // }
    //
    // handleFilterStartTimeChange(e) {
    //     const inputVal = e.target.value;
    //     this.props.filteredData(this.props.filterName, inputVal, this.props.filterEndTime)
    //     this.setState({filterStartTime: inputVal})
    // }
    //
    // handleFilterEndTimeChange(e) {
    //     const inputVal = e.target.value;
    //     this.props.filteredData(this.props.filterName, this.props.filterStartTime, inputVal)
    //     this.setState({filterEndTime: inputVal})
    // }

    render() {
        return (
            <Container>

                <FilterForm />

                {this.props.items.map((item, key) =>
                    <Item data={item} key={item.name}/>
                )}

            </Container>
        )
    }
}

Items.propTypes = {
    fetchData: PropTypes.func.isRequired,
    // filteredData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    // filterName: PropTypes.string,
    // filterStartTime: PropTypes.string,
    // filterEndTime: PropTypes.string,
}

const mapStateToProps = (state) => ({
    items: state.data.filterItems,
    // filterName: state.data.filterName,
    // filterStartTime: state.data.filterStartTime,
    // filterEndTime: state.data.filterEndTime,
})

const mapDispatchToProps = { fetchData }

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Items)
