import React, { Component } from "react";       
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

import * as filterActions from "../actions/filters";

export class ExpenseListFilters extends Component {

    state = {

        calendarFocused: null
    };

    onTextChange = (event) => { 
        
        this.props.setTextFilter(event.target.value) 
    };

    onSelectChange = (event) => {

        if (event.target.value === "date") {

            this.props.sortByDate();
        }
        else if (event.target.value === "amount") {

            this.props.sortByAmount();
        }

    };

    onDatesChange = ({ startDate, endDate }) => {

        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calendarFocused) => {

        this.setState(() => ({ calendarFocused }));
    };

    render() {

        return (

            <div>
                <input 
                    type="text" 
                    value={this.props.filters.text}
                    onChange={this.onTextChange} 
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={this.onSelectChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        );
    }

};

const mapStateToProps = (state) => {

    return { filters: state.filters };
};

export default connect(mapStateToProps, filterActions)(ExpenseListFilters);

/*

if we connected the component like so:

    export default connect(mapStateToProps)(ExpenseListFilter);

then on the this.props we have filters but we also have the dispatch function and we can call it inside the component with the action object:

    onChange={(event) => { this.props.dispatch({type: "SET_TEXT_FILTER", text: event.target.value}) }}

 or use the setTextFilter action creator to create the object:

    onChange={(event) => { this.props.dispatch(setTextFilter(event.target.value)) }}


BUT if we connect the component with the action creator, passing it as a second argument inside an object:

    export default connect(mapStateToProps, { setTextFilter })(ExpenseListFilter);

then on the this.props we have filters but we also have the setTextFilter action creator and we can use it inside the component without needing dispatch:

    onChange={(event) => { this.props.setTextFilter(event.target.value) }}

*/

/*

if we only need dispatch on the this.props we can connect the component like so:

    export default connect()(ExpenseListFilter);

*/

/* 

using the shorthand notation for mapDispatchToProps


we can write:

    EXAMPLE 1

    const mapDispatchToProps = (dispatch) => {

        return {

            setTextFilterProp: (text) => {  // we name the prop

                dispatch(setTextFilter(text))
            }
        };

    };

    export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);


or:

    EXAMPLE 2

    const mapDispatchToProps = (dispatch) => {

        return {

            setTextFilter: (text) => {  // it can be the same name as the action creator

                dispatch(setTextFilter(text))
            }
        };

    };

    export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);

and if the arguments passed to our prop are in the same order as the arguments passed to the action creator we can use an object shorthand and we don't need to use mapDispatchTothis.props:

    EXAMPLE 1

    export default connect(mapStateToProps, { setTextFilterProp: setTextFilter })(ExpenseListFilter);

if the names are the same then it's even shorter:

    EXAMPLE 2

    export default connect(mapStateToProps, { setTextFilter })(ExpenseListFilter);



// https://egghead.io/lessons/javascript-redux-using-mapdispatchtothis.props-shorthand-notation

*/