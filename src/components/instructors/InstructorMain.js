import React, { Component } from 'react';
import InstructorFilter from './InstructorFilter';
import InstructorIndex from './InstructorIndex';

class InstructorMain extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s8">
          <InstructorIndex />
        </div>
        <div className="col s4">
          <InstructorFilter />
        </div>
      </div>
    );
  }
}

export default InstructorMain;
