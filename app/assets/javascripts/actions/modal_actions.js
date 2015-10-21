/* global ModalConstants */
(function(root) {
  'use strict';
  root.ModalActions = {
    activateSongFormModal: function (song) {
      song = song || {};
      var action = {
        actionType: ModalConstants.RECEIVE_SONG_FORM_MODAL,
        data: {state: true, prop: song}
      };

      AppDispatcher.dispatch(action);
    },
    
    deactivateSongFormModal: function () {
      var action = {
        actionType: ModalConstants.RECEIVE_SONG_FORM_MODAL,
        data: {state: false, prop: {}}
      };

      AppDispatcher.dispatch(action);
    }
  };
}(this));
