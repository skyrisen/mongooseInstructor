import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Range } from '../filters';
import * as actions from '../../actions';

const TEXT_FIELDS = [
  { label: '名字', prop: 'name' }
];

class InstructorFilter extends Component {
  componentWillMount() {
    if (this.props.filters) {
      this.props.searchInstructors({
        name: '',
        ...this.props.filters
      });
    } else {
      this.props.searchInstructors({
        name: '',
        sort: 'name'
      });
    }
  }

  componentDidMount() {
    this.props.setAgeRange();
  }

  handleSubmit(formProps) {
    this.props.searchInstructors({
      name: '',
      ...formProps
    });
  }

  renderInputs() {
    return TEXT_FIELDS.map(({ label, prop }) =>
      <div className="input-field" key={prop}>
        <Field
          placeholder={label}
          id={prop}
          name={prop}
          component="input"
          type="text"
        />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="card blue darken-1 row">
        <div className="card-content white-text">
          <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <div className="center-align card-title">
              搜索
            </div>

            {this.renderInputs()}

            <div className="input-field">
              <Field
                id="age"
                label="年齡"
                component={Range}
                type="text"
                name="age"
                range={this.props.ageRange}
              />
            </div>

            <div>
              <label className="select" htmlFor="sort">排序方式</label>
              <Field id="sort" name="sort" component="select">
                <option value="name">名字</option>
                <option value="age">年齡</option>
              </Field>
            </div>

            <div className="center-align">
              <button className="btn">提交</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { filterCriteria } = state;

  return {
    ageRange: filterCriteria.age,
    filters: state.form.filters && state.form.filters.values
  };
};

export default connect(mapStateToProps, actions)(reduxForm({
  destroyOnUnmount: false,
  form: 'filters',
  initialValues: { sort: 'name' }
})(InstructorFilter));
