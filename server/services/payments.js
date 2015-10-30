// Input: two sorted arrays:
// [owedUsers: {id: int, owed: number}]
// [owingUsers: {id: int, debt: number}]
// Output: unsorted payment array:
// [payment: {fromUserId: int, toUserId: int, amount: number}]

// !! CAUTION: mutates input arrays !!

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

    // console.log(i, owedUser, j, owingUser);

    if (owedUser.owed > owingUser.debt) {

      paymentAmount = owingUser.debt;

      owedUser.owed -= paymentAmount;

      // owingUsers.shift();
      j++;

    } else if (owedUser.owed < owingUser.debt) {

      paymentAmount = owedUser.owed;

      owingUser.debt -= paymentAmount;

      // owedUsers.shift();
      i++;

    } else {

      paymentAmount = owedUser.owed;

      // owedUsers.shift();
      // owingUsers.shift();
      i++;
      j++;

    }

    payments.push({
      toUserId: owedUser.id,
      fromuserId: owingUser.id,
      amount: paymentAmount,
    });

  }

  return payments;

}

module.exports = calculatePayments;

// var testOwed = [
//   {
//     id: 1,
//     owed: 30,
//   },
//   {
//     id: 2,
//     owed: 15,
//   },
// ];

// var testOwing = [
//   {
//     id: 3,
//     debt: 25,
//   },
//   {
//     id: 4,
//     debt: 20,
//   },
// ];
