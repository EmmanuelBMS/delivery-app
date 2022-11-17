import React, { useContext } from 'react';
import { AllUsersContext } from '../../context/AllUsersContexProvider';

export default function AdminManageTable() {
  const { allUsers, setAllUsers } = useContext(AllUsersContext);

  function removeUser(id) {
    const removed = allUsers.filter((user) => user.id !== id);
    setAllUsers(removed);
  }
  return (
    <table className="bg-gray-100">
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user, index) => (
          <tr key={ index }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${index}` }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              {user.name}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              {user.email}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              {user.role}
            </td>
            <td>
              <button
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                onClick={ () => removeUser(user.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
