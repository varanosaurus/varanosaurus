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
          owed: 3000,
        },
        {
          id: 2,
          owed: 2000,
        },
        {
          id: 3,
          owed: 1000,
        },
      ],
      owingUsers: [
        {
          id: 4,
          debt: 3000,
        },
        {
          id: 5,
          debt: 3000,
        },
      ],
    },
    expected: [
      {
        toUserId: 1,
        fromUserId: 4,
        amount: 3000,
      },
      {
        toUserId: 2,
        fromUserId: 5,
        amount: 2000,
      },
      {
        toUserId: 3,
        fromUserId: 5,
        amount: 1000,
      },
    ],
  },

  {
    input: {

      owedUsers: [
        {
          id: 1,
          owed: 7000,
        },
        {
          id: 2,
          owed: 6000,
        },
        {
          id: 3,
          owed: 6000,
        },
        {
          id: 4,
          owed: 6000,
        },
      ],

      owingUsers: [
        {
          id: 5,
          debt: 15000,
        },
        {
          id: 6,
          debt: 6000,
        },
        {
          id: 7,
          debt: 4000,
        },
      ],
    },

    expected: [
      {
        toUserId: 1,
        fromUserId: 5,
        amount: 7000,
      },
      {
        toUserId: 2,
        fromUserId: 5,
        amount: 6000,
      },
      {
        toUserId: 3,
        fromUserId: 6,
        amount: 6000,
      },
      {
        toUserId: 4,
        fromUserId: 7,
        amount: 4000,
      },
      {
        toUserId: 4,
        fromUserId: 5,
        amount: 2000,
      },
    ],

  },

  {
    input: {

      owedUsers: [
        {
          id: 1,
          owed: 9741,
        },
        {
          id: 2,
          owed: 3430,
        },
      ],

      owingUsers: [
        {
          id: 3,
          debt: 5139,
        },
        {
          id: 4,
          debt: 4405,
        },
        {
          id: 5,
          debt: 3627,
        },
      ],

    },

    expected: [
      {
        toUserId: 1,
        fromUserId: 3,
        amount: 5139,
      },
      {
        toUserId: 1,
        fromUserId: 4,
        amount: 4405,
      },
      {
        toUserId: 2,
        fromUserId: 5,
        amount: 3430,
      },
      {
        toUserId: 1,
        fromUserId: 5,
        amount: 197,
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
