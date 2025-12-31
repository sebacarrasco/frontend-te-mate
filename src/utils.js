export const getGameStatusTranslation = (status) => {
  if (status === 'setup') {
    return 'En preparación';
  }
  if (status === 'in progress') {
    return 'En progreso';
  }
  return 'Completado';
};
