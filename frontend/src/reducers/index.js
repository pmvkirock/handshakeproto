import { combineReducers } from 'redux';
import getType from './getType';
import getJobFilterPartFull from './getJobFilterPartFull';
import getJobFilter from './getJobFilter';
import getCityFilter from './getCityFilter';
import getStudFilter from './getStudFilter';
import getSchoolFilter from './getSchoolFilter';
import getMajorFilter from './getMajorFilter';
import getEventsFilter from './getEventFilter';

const allReducers = combineReducers({
  getType: getType,
  getJobFilterPartFull: getJobFilterPartFull,
  getJobFilter: getJobFilter,
  getCityFilter: getCityFilter,
  getStudFilter: getStudFilter,
  getSchoolFilter: getSchoolFilter,
  getMajorFilter: getMajorFilter,
  getEventsFilter: getEventsFilter
});

export default allReducers;
