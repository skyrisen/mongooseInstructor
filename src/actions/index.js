import _ from 'lodash';
import { hashHistory } from 'react-router';
import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE,
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST,
  CREATE_ERROR,
  CLEAR_ERROR,
  DESELECT_ARTIST,
  SELECT_ARTIST,
  RESET_SELECTION
} from './types';

import GetAgeRange from '../../database/queries/GetAgeRange';
import SearchInstructors from '../../database/queries/SearchInstructors';
import FindInstructor from '../../database/queries/FindInstructor';
import CreateInstructor from '../../database/queries/CreateInstructor';
import EditInstructor from '../../database/queries/EditInstructor';
import DeleteInstructor from '../../database/queries/DeleteInstructor';
import SetRetired from '../../database/queries/SetRetired';
import SetNotRetired from '../../database/queries/SetNotRetired';

export const resetInstructor = () => {
  return { type: RESET_ARTIST };
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};

export const selectInstructor = id => {
  return { type: SELECT_ARTIST, payload: id };
};

export const deselectInstructor = id => {
  return { type: DESELECT_ARTIST, payload: id };
};

export const setRetired = ids => (dispatch, getState) =>
  SetRetiredProxy(ids.map(id => id.toString()))
  .then(() => dispatch({ type: RESET_SELECTION }))
  .then(() => refreshSearch(dispatch, getState));

export const setNotRetired = ids => (dispatch, getState) =>
  SetNotRetiredProxy(ids.map(id => id.toString()))
  .then(() => dispatch({ type: RESET_SELECTION }))
  .then(() => refreshSearch(dispatch, getState));

export const setAgeRange = () => dispatch =>
  GetAgeRangeProxy()
  .then(result =>
    dispatch({ type: SET_AGE_RANGE, payload: result })
  );

export const searchInstructors = (...criteria) => dispatch =>
  SearchInstructorsProxy(...criteria)
  .then((result = []) =>
    dispatch({ type: SEARCH_ARTISTS, payload: result })
  );

export const findInstructor = id => dispatch =>
  FindInstructorProxy(id)
  .then(instructor =>
    dispatch({ type: FIND_ARTIST, payload: instructor })
  );

export const createInstructor = props => dispatch =>
  CreateInstructorProxy(props)
  .then(instructor => {
    hashHistory.push(`instructors/${instructor.id}`);
  })
  .catch(error => {
    console.log(error);
    dispatch({ type: CREATE_ERROR, payload: error });
  });

export const editInstructor = (id, props) => dispatch =>
  EditInstructorProxy(id, props)
  .then(() => hashHistory.push(`instructors/${id}`))
  .catch(error => {
    console.log(error);
    dispatch({ type: CREATE_ERROR, payload: error });
  });

export const deleteInstructor = (id) => dispatch =>
  DeleteInstructorProxy(id)
  .then(() => hashHistory.push('/'))
  .catch(error => {
    console.log(error);
    dispatch({ type: CREATE_ERROR, payload: error });
  });


//
// Faux Proxies

const GetAgeRangeProxy = (...args) => {
  const result = GetAgeRange(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};


const SearchInstructorsProxy = (criteria, offset, limit) => {
  const result = SearchInstructors(_.omit(criteria, 'sort'), criteria.sort, offset, limit);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const FindInstructorProxy = (...args) => {
  const result = FindInstructor(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const CreateInstructorProxy = (...args) => {
  const result = CreateInstructor(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const EditInstructorProxy = (...args) => {
  const result = EditInstructor(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const DeleteInstructorProxy = (...args) => {
  const result = DeleteInstructor(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const SetRetiredProxy = (_ids) => {
  const result = SetRetired(_ids);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const SetNotRetiredProxy = (_ids) => {
  const result = SetNotRetired(_ids);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

//
// Helpers

const refreshSearch = (dispatch, getState) => {
  const { artists: { offset, limit } } = getState();
  const criteria = getState().form.filters.values;

  dispatch(searchInstructors({ name: '', ...criteria }, offset, limit));
};