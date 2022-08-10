import ErrorMessage from '../ErrorMessage';


const NetworkError = () => {

    return (
        <ErrorMessage
            code=""
            title="Network Error."
            message="The site is unable to reach the server this happens because 
            your connection is bad or the server is down."
            action="refresh"
            onClick={() => {
                window.location.reload();
            }}
        />
    );
};

export default NetworkError;