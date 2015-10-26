var state = {

  data: {
    user: null, //{userModel},
    household: null, //{householdModel},
    items: {
      bought: [], //[itemModel],
      pending: [], //[itemModel],
    },
    reckonings: [], /*[
      {
        reckoning: reckoningModel,
        items: [], //only fetch when viewing a reckoning?
      },
    ],*/
    invitations: {
      sent: [], //[invitationModel],
      received: [], //[invitationModel],
    },
  },

  uiMode: {
    entryMode: 'login', //'signup'
    selectedHomeTab: 'itemsTab', //'reckoningsTab', 'settingsTab'
    itemsViewMode: 'details', //'list'
    itemsFilter: 'pending', //'bought'
    itemDetails: 'list', //'details', 'add'
    reckoningsViewMode: 'list', //'details'
    selectedReckoning: null, //reckoningId
    selectedItem: null, //itemId
    reckoningsDetailsMode: 'list', //'details'
    settingsViewMode: 'options', //'invite'
  },

  token: null,

};