const getJobFilterPartFull = (state = 'None', action) => {
  switch (action.type) {
    case 'PartTime':
      return 'PartTime';
    case 'FullTime':
      return 'FullTime';
    case 'Internship':
      return 'Internship';
    case 'OnCampus':
      return 'OnCampus';
    case 'filterMyJobs':
      return 'MyJobs';
    case 'Logout':
      return 'None';
    default:
      return state;
  }
};

export default getJobFilterPartFull;
