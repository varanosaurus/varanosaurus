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

  var i = 0;
  var j = 0;

  while (i < owedUsers.length && j < owingUsers.length) {

    owedUser = owedUsers[i];
    owingUser = owingUsers[j];


    if (owedUser.owed > owingUser.debt) {

      paymentAmount = owingUser.debt;

      owedUser.owed -= paymentAmount;

      j++;

    } else if (owedUser.owed < owingUser.debt) {

      paymentAmount = owedUser.owed;

      owingUser.debt -= paymentAmount;

      i++;

    } else {

      paymentAmount = owedUser.owed;

      i++;
      j++;

    }

    payments.push({
      toUserId: owedUser.id,
      fromUserId: owingUser.id,
      amount: paymentAmount,
    });

  }

  return payments;

}

module.exports = calculatePayments;
