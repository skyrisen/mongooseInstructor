import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import filterCriteriaReducer from './FilterCriteriaReducer';
import InstructorsReducer from './InstructorReducer';
import ErrorReducer from './ErrorReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  form: formReducer,
  filterCriteria: filterCriteriaReducer,
  artists: InstructorsReducer,
  errors: ErrorReducer,
  selection: SelectionReducer
});
