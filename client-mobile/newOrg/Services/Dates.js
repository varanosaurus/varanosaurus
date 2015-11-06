var months = {
  '00': 'December',
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
};

var convertDate = function(date) {

  var result;

  var month = months[date.slice(5, 7)];

  var day = +date.slice(8, 10);

  var year = date.slice(0, 4);

  result = month + ' ' + day + ' ' + year;

  return result;
};

module.exports = convertDate;
