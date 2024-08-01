import { useEffect } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'idle') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [navigation]);

  return (
    <div className="flex flex-col px-content py-10 md:px-content-md lg:px-content-lg">
      <Link to="/" className="mb-4 flex justify-center">
        Get back to Home
      </Link>

      <img
        src="img/page-not-found.png"
        alt="Page not found"
        onClick={() => navigate('/')}
      />
    </div>
  );
};
