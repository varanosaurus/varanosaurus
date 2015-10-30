var assert = require('assert');

var payments = require('../../server/services/payments');

describe('Payments calculation', function() {

  it('should calculate optimal payment schemes for multiple people', function() {

    testCases.forEach(function(testCase) {
      var actual = payments(testCase.input.owedUsers, testCase.input.owingUsers);

      console.log(actual);
      assert.deepEqual(testCase.expected, actual);

    });

  }); // 'should calculate optimal payment schemes for multiple people'

}); // 'Payments calculation'

var testCases = [

  {
    input: {
      owedUsers: [
        {
          id: 1,
          owed: 30,
        },
        {
          id: 2,
          owed: 20,
        },
        {
          id: 3,
          owed: 10,
        },
      ],
      owingUsers: [
        {
          id: 4,
          debt: 30,
        },
        {
          id: 5,
          debt: 30,
        },
      ],
    },
    expected: [
      {
        toUserId: 1,
        fromUserId: 4,
        amount: 30,
      },
      {
        toUserId: 2,
        fromUserId: 5,
        amount: 20,
      },
      {
        toUserId: 3,
        fromUserId: 5,
        amount: 10,
      },
    ],
  },

  {
    input: {

      owedUsers: [
        {
          id: 1,
          owed: 70,
        },
        {
          id: 2,
          owed: 60,
        },
        {
          id: 3,
          owed: 60,
        },
        {
          id: 4,
          owed: 60,
        },
      ],

      owingUsers: [
        {
          id: 5,
          debt: 150,
        },
        {
          id: 6,
          debt: 60,
        },
        {
          id: 7,
          debt: 40,
        },
      ],
    },

    expected: [
      {
        toUserId: 1,
        fromUserId: 5,
        amount: 70,
      },
      {
        toUserId: 2,
        fromUserId: 5,
        amount: 60,
      },
      {
        toUserId: 3,
        fromUserId: 6,
        amount: 60,
      },
      {
        toUserId: 4,
        fromUserId: 7,
        amount: 40,
      },
      {
        toUserId: 4,
        fromUserId: 5,
        amount: 20,
      },
    ],

  },

  {
    input: {

      owedUsers: [
        {
          id: 1,
          owed: 97.41,
        },
        {
          id: 2,
          owed: 34.30,
        },
      ],

      owingUsers: [
        {
          id: 3,
          debt: 51.39,
        },
        {
          id: 4,
          debt: 44.05,
        },
        {
          id: 5,
          debt: 36.27,
        },
      ],

    },

    expected: [
      {
        toUserId: 1,
        fromUserId: 3,
        amount: 51.39,
      },
      {
        toUserId: 1,
        fromUserId: 4,
        amount: 44.05,
      },
      {
        toUserId: 2,
        fromUserId: 5,
        amount: 34.30,
      },
      {
        toUserId: 1,
        fromUserId: 5,
        amount: 1.97,
      },
    ],

  },

  /*{
    input: {
      owedUsers: [
      ],
      owingUsers: [
      ],
    },
    expected: [
    ],
  },

  {
    input: {
      owedUsers: [
      ],
      owingUsers: [
      ],
    },
    expected: [
    ],
  },*/

];
