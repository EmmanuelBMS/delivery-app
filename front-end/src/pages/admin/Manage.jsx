import React from 'react';
import AdminForm from '../../components/CreateUserForm/CreateUserForm';
import Navbar from '../../components/Navbar/Navbar';

export default function Manage() {
  return (
    <div>
      <Navbar />
      <main>
        <AdminForm />
      </main>
    </div>
  );
}
