import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { setSelectedUsers, startGettingUsers } from '../../actions/users';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../ui/Loading';

export const UsersSelector = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.ui.usersLoading);
  const { users, selectedUsers } = useSelector((state) => state.users);
  const { userId } = useAuth();

  useEffect(() => {
    dispatch(startGettingUsers());
  }, [dispatch, startGettingUsers]);

  if (loading) {
    return <Loading />;
  }
  if (error === 401) {
    return <Alert variant="danger">No tienes autorización para ver a los usuarios</Alert>;
  }
  if (error !== '') {
    return <Alert variant="danger">Ha ocurrido un error, vuelve a intentarlo recargando la página</Alert>;
  }

  return (
    <Select
      value={selectedUsers}
      onChange={(selected) => dispatch(setSelectedUsers(selected))}
      options={
        users
          .filter((u) => u.id !== userId)
          .map((user) => ({ value: user.id, label: `${user.firstName} ${user.lastName} (${user.email})` }))
      }
      isMulti
      className="text-black"
      styles={{
        container: (base) => ({
          ...base,
          flex: 1,
        }),
      }}
      menuPosition="fixed"
      placeholder="Selecciona usuarios"
    />
  );
};
