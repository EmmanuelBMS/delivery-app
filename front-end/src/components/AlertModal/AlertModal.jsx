import React from 'react';
import PropTypes from 'prop-types';
import './alertModal.css';

export default function AlertModal({ toggleModalStatus, message, dataTestId }) {
  return (
    <div className="modalContainer">
      <strong data-testid={ `${dataTestId}` } className="text-bold">
        {message}
      </strong>
      <button
        className="modalCloseBtn"
        type="button"
        onClick={ toggleModalStatus }
      >
        Fechar
      </button>
    </div>
  );
}

AlertModal.propTypes = {
  toggleModalStatus: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
