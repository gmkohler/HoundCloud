/* global React */
/* global EventEmitter */
/* global ModalConstants */
/* global AppDispatcher */

(function(root) {
  'use strict';
  var _modals = {
    songForm: {
      state: false,
      prop: {}
    }
  };

  root.ModalStore = $.extend({}, EventEmitter.prototype, {
    getModal: function (modalKey) {
      return _modals[modalKey];
    },

    registerSongFormChangeListener: function (callback) {
      this.on(ModalConstants.SONG_FORM_MODAL_CHANGE, callback);
    },

    removeSongFormChangeListener: function (callback) {
      this.removeListener(ModalConstants.SONG_FORM_MODAL_CHANGE, callback);
    },

    songFormHasChanged: function () {
      this.emit(ModalConstants.SONG_FORM_MODAL_CHANGE);
    },

    DispatcherID: AppDispatcher.register(function(action){
      switch (action.actionType) {
        case ModalConstants.RECEIVE_SONG_FORM_MODAL:
          _modals.songForm = action.data;
          ModalStore.songFormHasChanged();
          break;
      }
    })
  });
}(this));
