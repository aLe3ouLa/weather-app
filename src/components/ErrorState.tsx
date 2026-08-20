import './ErrorState.css';

export const ErrorState = ({ refetch }: { refetch: () => void}) => {
    return (
        <section className="error-state-container">
            <img width="24" alt="Something went wrong" src="src/assets/images/icon-error.svg" />
            <h1>Something went wrong</h1>
            <p className="error-state-description">We couldn't connect to the server (API error). Please try again in a few moments.</p>
            <button className="retry-button" onClick={refetch}>
                <img width="14" alt="Retry" src="src/assets/images/icon-retry.svg" />
                Retry
            </button>
        </section>
    )
}