var months = {
  '00': 'January',
  '01': 'February',
  '02': 'March',
  '03': 'April',
  '04': 'May',
  '05': 'June',
  '06': 'July',
  '07': 'August',
  '08': 'September',
  '09': 'October',
  '10': 'November',
  '11': 'December',
};

var convertDate = function(date) {
  console.log('being called with: ', date);

  var result;

  var month = months[date.slice(5, 7)];

  var day = date.slice(8, 10);

  var year = date.slice(0, 4);

  result = month + ' ' + day + ' ' + year;

  return result;
}

module.exports = convertDate;