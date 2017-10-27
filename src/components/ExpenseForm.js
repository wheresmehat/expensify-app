import React, { Component } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

moment.locale("en-gb"); // breaks testing, uncomment for production

class ExpenseForm extends Component {

    state = {

        description: this.props.expense ? this.props.expense.description : "",
        amount: this.props.expense ? (this.props.expense.amount / 100).toString() : "",
        note: this.props.expense ? this.props.expense.note : "",
        createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
        calendarFocused: false,
        error: ""
    };

    onDescriptionChange = (event) => {
        
        const description = event.target.value;

        this.setState(() => ({ description }));
    }

    onNoteChange = (event) => {

        const note = event.target.value;

        this.setState(() => ({ note }));
    };

    onAmountChange = (event) => {

        const amount = event.target.value;
    
        if (!amount || /^\d+(?:\.\d{0,2})?$/.test(amount)) {
            
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = (createdAt) => {

        if (createdAt) {

            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {

        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (event) => {

        event.preventDefault();

        if (!this.state.description || !this.state.amount) {

            this.setState(() => ({ error: "Please provide description and amount." }));
        }
        else {

            this.setState(() => ({ error: "" }));

            const expense = { 
                
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()    
            };
            
            this.props.onSubmit(expense);
        }

    };

    render() {

        return (

            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        name="description" 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false} 
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>
                        Add Expense
                    </button>
                </form>
            </div>
        );
    }

};

export default ExpenseForm;