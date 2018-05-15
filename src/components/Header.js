import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { id: null };
  }

  componentWillMount() {
    this.setLink();
  }

  setLink() {
    window.db.collection('instructors')
      .aggregate({ $sample: { size: 100 } })
      .toArray()
      .then((instructors) => {
        const instructor = instructors[~~(Math.random() * instructors.length)];
        if (instructor) {
          this.setState({ id: instructor._id.toString() });
        }
      });
  }

  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper blue">
            <div className="col s6">
              <a href="#" className="brand-logo">講師訊息中心</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link
                    to={`/instructors/${this.state.id}`}
                    onClick={this.setLink.bind(this)}
                  >
                   隨選講師
                  </Link>
                </li>
                <li>
                  <Link to={'/instructors/new'}>
                    新增講師
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

export default Header;
