import react from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { loadingSpinner, error} from 'components/LoadingSpinner/LoadingSpinner.module.scss';

const LoadingSpinner =({isLoading, isError}) => {
    return(
        <div className={loadingSpinner}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin size="lg" /> : null}
            {isError ? <p className={error}>Something went wrong</p> : null}
        </div>
    )
}

export default LoadingSpinner;