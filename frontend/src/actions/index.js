export const CompanyType = () => {
  return {
    type: 'CompanyType'
  };
};

export const StudentType = () => {
  return {
    type: 'StudentType'
  };
};

export const PartTime = () => {
  return {
    type: 'PartTime'
  };
};

export const FullTime = () => {
  return {
    type: 'FullTime'
  };
};

export const Internship = () => {
  return {
    type: 'Internship'
  };
};

export const OnCampus = () => {
  return {
    type: 'OnCampus'
  };
};

export const Logout = () => {
  return {
    type: 'Logout'
  };
};

export const updateJobFilter = x => {
  return {
    type: 'filterJobUpdate',
    newState: x
  };
};

export const updateCityFilter = x => {
  return {
    type: 'filterCityUpdate',
    newState: x
  };
};

export const updateStudName = x => {
  return {
    type: 'filterStudName',
    newState: x
  };
};

export const updateSchoolName = x => {
  return {
    type: 'filterSchoolName',
    newState: x
  };
};

export const updateMajor = x => {
  return {
    type: 'filterMajor',
    newState: x
  };
};

export const getMyJobs = () => {
  return {
    type: 'filterMyJobs'
  };
};
