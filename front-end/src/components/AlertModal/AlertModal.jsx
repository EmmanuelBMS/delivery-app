import React from 'react';
import PropTypes from 'prop-types';
import './alertModal.css';

export default function AlertModal({ toggleModalStatus }) {
  return (
    <div className="modalContainer">
      <strong data-testid="common_login__element-invalid-email" className="text-bold">
        Erro: Usuario nao encontrado
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
};
