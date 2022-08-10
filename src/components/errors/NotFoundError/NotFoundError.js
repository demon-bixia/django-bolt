import ErrorMessage from '../ErrorMessage';
import { useNavigate } from 'react-router-dom';

const NotFoundError = () => {
    const navigate = useNavigate();

    return (
        <ErrorMessage
            code="404"
            title="Page Not Found."
            message="The page you’re looking for doesn’t exist or has been moved
            try a different url or go back to the home page."
            action="Go Back Home"
            onClick={() => {
                navigate('/')
            }}
        />
    );
};

export default NotFoundError;