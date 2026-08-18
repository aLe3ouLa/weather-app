export const ErrorState = () => {
    return (
        <article>
            <img src="src/assets/images/icon-error.svg" />
            <h1>Something went wrong</h1>
            <p>We couldn't connect to the server (API error). Please try again in a few moments.</p>
            <button>
                <img src="src/assets/images/icon-retry.svg" />
                Retry
            </button>
        </article>
    )
}