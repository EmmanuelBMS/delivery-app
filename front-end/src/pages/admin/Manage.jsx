import React, { useEffect, useContext } from 'react';
import AdminManageTable from '../../components/AdminManageTable/AdminManageTable';
import AdminForm from '../../components/CreateUserForm/CreateUserForm';
import Navbar from '../../components/Navbar/Navbar';
import { AllUsersContext } from '../../context/AllUsersContexProvider';

export default function Manage() {
  const { requestAllUsers } = useContext(AllUsersContext);
  const user = localStorage.getItem('user');

  useEffect(() => {
    requestAllUsers(user);
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <div>
          Cadastrar Novo Usuário
          <AdminForm />
        </div>
        <div>
          Lista de usuários
          <AdminManageTable />
        </div>
      </main>
    </div>
  );
}
