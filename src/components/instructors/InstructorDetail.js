import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

class InstructorDetail extends Component {
  componentWillMount() {
    this.props.findInstructor(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.findInstructor(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.resetInstructor();
  }

  onDeleteClick() {
    this.props.deleteInstructor(this.props.params.id);
  }

  renderCourses() {
    const { courses } = this.props.artist;

    if (!courses || !courses.map) { return; }

    return courses.map(course => {
      return (
        <div className="card album" key={course.title}>
          <div className="card-image">
            <img src={course.image} />
          </div>
          <div className="card-content">
            <span className="card-title">
              <span>{course.title}</span>
            </span>
            <div>
              <h5>銷售數： {course.copiesSold}</h5>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.artist) { return <div>Todo: implement "FindInstructor" query</div>; }

    const { artist: { name, age, genre, image, yearsActive, netWorth, _id } } = this.props;

    return (
      <div>
        <div className="spacer">
          <Link to="/">返回</Link>
          <Link to={`/instructors/${_id}/edit`}>編輯</Link>
          <a onClick={this.onDeleteClick.bind(this)}>刪除</a>
        </div>
        <ul className="collection artist-detail">
          <li className="collection-item header">
            <div>
              <h3>{name}</h3>
              <h5>專長: {genre}</h5>
            </div>
            <image src={image} className="right" />
          </li>
          <li className="collection-item">
            <h5>年紀： {age}</h5>
          </li>
          <li className="collection-item">
            <h5>總收入：${netWorth}</h5>
          </li>
          <li className="flex wrap">
            {this.renderCourses()}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ artists }) => {
  return { artist: artists.artist };
};

export default connect(mapStateToProps, actions)(InstructorDetail);
