import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 21;

class EmployeeList extends Component {
  componentWillMount() {
    this.page = 1;
  }

  handleButtonClick = () => {
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  };

  render() {
    return (
      <>
        <div className="employee-list">
          {this.props.employees.map(employee => (
            <EmployeeDetail employee={employee} key={employee._id} />
          ))}
        </div>
        <button className="btn btn-primary" onClick={this.handleButtonClick}>
          Load More...
        </button>
      </>
    );
  }
}

export default withTracker(() => {
  //Set up Subscribtion
  Meteor.subscribe('employees', PER_PAGE);
  //return object, Whatever we return will be sent to EmployeeList
  //as props
  return { employees: Employees.find({}).fetch() };
})(EmployeeList);
