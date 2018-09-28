import React from 'react';
import {
  setOpenHandler,
  newModalUIID,
  renderModal,
  renderMessage,
  sendMessage,
  setMessageRenderer,
  Container,
} from 'pangea-sdk';
import Modal from './src/components/Modal';
import SendMessage from './src/components/SendMessage';

function showMainModal(payload, cb) {
  // obtain a new modal id
  newModalUIID(
    () => {
    },
    (error, modalUIID) => {
      if (error) {
        return cb(error);
      }
      renderModal(<Modal title='One time buy/payment'
                         context={payload.context}
                         initialData={payload.initialData}
                         modalContainer={new Container(modalUIID)}/>, cb);
    },
  );
}

/**
 * @desc Function that is called on DApp start
 */
setOpenHandler((payload, cb) => {
  showMainModal(payload, cb);
});

/**
 * @desc Function that is called to render message
 */
setMessageRenderer((payload, cb) => {
  const { message } = payload;

  const Component = SendMessage;
  let propsToPass = {};

  if (Component === null) {
    cb(null, {});
  }

  renderMessage(
    <Component
      payload={payload}
      {...propsToPass}
    />,
    (jsx) => {
      cb(null, jsx);
    });
});
