import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const birthdayStyle = `
  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background-color: #cfeee6;
  }
  .DayPicker-Day--today {
    color: #009369;
  }
  .DayPicker-Day--highlighted {
    background-color: #e5f5f1;
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover,
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: #009369;
  }
  .DayPicker-Month {
    margin: 0
  }
`;

export default class SessionDayPicker extends Component {

  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.state = {
      selectedDay: null
    }
  }

  handleDayClick(day, { selected }) {
    this.props.onDateSelect(day)

    this.setState({
      selectedDay: day,
    })
  }

  // <p>
  //   {this.state.selectedDay
  //     ? null
  //     : 'Please select a day 👻'}
  // </p>

  render() {
    let modifiers = {};

    if(this.props.sessions) {
      modifiers['highlighted'] = this.props.sessions.map(d => new Date(d.start_time * 1000));
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <style>{birthdayStyle}</style>
        <DayPicker
          fixedWeeks
          selectedDays={this.props.selectedDate}
          onDayClick={this.handleDayClick}
          modifiers={modifiers}
        />
      </div>
    )
  }
}
