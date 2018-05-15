import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Paginator from './Paginator';
import * as actions from '../../actions';

class InstructorIndex extends Component {
  onChange(_id) {
    if (_.contains(this.props.selection, _id)) {
      this.props.deselectInstructor(_id);
    } else {
      this.props.selectInstructor(_id);
    }
  }

  renderList(instructor) {
    const { _id } = instructor;
    const classes = `collection-item avatar ${instructor.retired && 'retired'}`;

    return (
      <li className={classes} key={_id}>
        <div>
          <input
            id={_id}
            type="checkbox"
            checked={_.contains(this.props.selection, _id)}
            onChange={() => this.onChange(_id)}
          />
          <label htmlFor={_id} />
        </div>
        <img src={instructor.image} className="circle" />
        <div>
          <span className="title">
            <strong>{instructor.name}</strong>
          </span>
          <p>
            <b>{instructor.age}</b> years old
            <br />
            {instructor.courses ? instructor.courses.length : 0} 筆課程上架
          </p>
        </div>
        <Link to={`instructors/${instructor._id}`} className="secondary-content">
           <i className="material-icons">play_arrow</i>
         </Link>
      </li>
    );
  }

  renderPaginator() {
    if (this.props.artists.all.length) {
      return <Paginator />;
    }
  }

  renderEmptyCollection() {
    if (this.props.artists.all.length) { return; }

    return (
      <div className="center-align">
        <h5>無相關紀錄!</h5>
        <div>請重試一次</div>
      </div>
    );
  }

  renderRetire() {
    if (this.props.selection.length) {
      return (
        <div>
          <button
            className="btn"
            onClick={() => this.props.setRetired(this.props.selection)}
          >
            退休
          </button>
          <button
            className="btn"
            onClick={() => this.props.setNotRetired(this.props.selection)}
          >
            未退休
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderRetire()}
        <ul className="collection">
          {this.props.artists.all.map(this.renderList.bind(this))}
          {this.renderEmptyCollection()}
        </ul>

        {this.renderPaginator()}
      </div>
    );
  }
}

const mapStateToProps = ({ artists, selection }) => ({ artists, selection });

export default connect(mapStateToProps, actions)(InstructorIndex);
