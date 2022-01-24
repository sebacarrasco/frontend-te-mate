import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { token } = useSelector((state) => state.auth);
  try {
    const { sub } = jwtDecode(token);
    return {
      isLogged: true,
      userId: sub,
    };
  } catch (e) {
    return { isLogged: false };
  }
};
