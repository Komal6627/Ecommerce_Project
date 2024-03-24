import React from 'react';
import { StyledLink } from './components/CheckoutSteps'; // Correct import for StyledLink
import CheckoutSteps from './components/CheckoutSteps'; // Correct import for CheckoutSteps

const App = () => {
    return (
        <div>
            <h1>Hello</h1>
            <CheckoutSteps />
            {/* <StyledLink to="/some-route">Custom Link</StyledLink> */}
        </div>
    );
};

export default App;
