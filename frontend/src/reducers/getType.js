const getType = (state = 'Company', action) => {
  switch (action.type) {
    case 'CompanyType':
      return 'Company';
    case 'StudentType':
      return 'Student';
    default:
      return state;
  }
};

export default getType;
