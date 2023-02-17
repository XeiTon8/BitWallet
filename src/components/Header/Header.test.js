import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from '@remix-run/router';
import App from '../../App';

const renderWithRouting = (child) => {
const history = createMemoryHistory();
return {
    ...render(

<Router location={history.location} navigator={history}> 
{child}
</Router>

)}
   

}

it("should navigate to the favorites page", () => {
    const {container, getByTestId} = renderWithRouting(<App />);

    fireEvent.click(getByTestId('favorites-link'));

    expect(container.innerHTML).toMatch("/favorites");
})