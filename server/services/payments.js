// Input: two sorted arrays:
// [owedUsers: {id: int, owed: number}]
// [owingUsers: {id: int, debt: number}]
// Output: unsorted payment array:
// [payment: {fromUserId: int, toUserId: int, amount: number}]

function calculatePayments(owedUsers, owingUsers) {
  var payments = [];
  var owedUser;
  var owingUser;
  var paymentAmount;

  while (owedUsers.length && owingUsers.length) {

    owedUsers.sort(compareProps('owed'));
    owingUsers.sort(compareProps('debt'));

    owedUser = owedUsers[0];
    owingUser = owingUsers[0];


    if (owedUser.owed > owingUser.debt) {

      paymentAmount = owingUser.debt;

      owedUser.owed -= paymentAmount;

      owingUsers.shift();

    } else if (owedUser.owed < owingUser.debt) {

      paymentAmount = owedUser.owed;

      owingUser.debt -= paymentAmount;

      owedUsers.shift();

    } else {

      paymentAmount = owedUser.owed;

      owingUsers.shift();
      owedUsers.shift();

    }

    payments.push({
      toUserId: owedUser.id,
      fromUserId: owingUser.id,
      amount: parseInt(paymentAmount, 10),
    });

  }

  return payments;
}

function compareProps(prop) {

  return function(a, b) {
    if (a[prop] >= b[prop]) {
      return -1;
    } else {
      return 1;
    }
  };

}

module.exports = calculatePayments;
