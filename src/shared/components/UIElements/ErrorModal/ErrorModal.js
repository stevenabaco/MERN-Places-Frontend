import React from 'react';

import Modal from '../Modal/Modal';
import Button from '../../FormElements/Button/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Something went wrong!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
