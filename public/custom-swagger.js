document.addEventListener('DOMContentLoaded', function () {
    console.log('Script initialized: DOMContentLoaded');

    // Save the original fetch function
    const originalFetch = window.fetch;

    // Override the fetch function
    window.fetch = async function (...args) {
        console.log('Fetch method called');

        try {
            // Call the original fetch function
            const response = await originalFetch.apply(this, args);

            console.log('Fetch request completed. Response URL:', response.url);

            if (response.url.includes('/auth/login')) {
                const responseBody = await response.clone().json();
                const token = responseBody.access_token;

                if (token) {
                    console.log('Captured Token:', token);
                    if (window.ui && window.ui.authActions) {
                        let bearer = {
                            name: 'bearer',
                            schema: {
                                bearerFormat: 'JWT',
                                scheme: 'bearer',
                                type: 'http'
                            },
                            value: token
                        };
                        localStorage.setItem(
                            'authorized',
                            JSON.stringify({ ...bearer, bearer: bearer })
                        );
                        window.ui.authActions.authorize({
                            bearer: bearer
                        });
                    } else {
                        console.warn(
                            'Swagger UI instance not found. Cannot set token.'
                        );
                    }
                }
            }

            return response;
        } catch (error) {
            console.error('Error during fetch:', error);
            throw error;
        }
    };

    // Test fetch to see if the overridden method gets triggered
    fetch('/test-endpoint'); // This is a dummy endpoint for testing purposes
});
