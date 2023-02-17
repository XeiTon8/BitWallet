import React from 'react';
import { FaqQuestion } from './FaqQuestion';
import { render, cleanup, getByTestId, fireEvent } from '@testing-library/react';

afterEach(cleanup);

it("should be opened after click", () => {
    const { getByTestId } = render(<FaqQuestion />);
    fireEvent.click(getByTestId("accordion-btn"));
    expect(getByTestId("accordion-panel").classList.contains("panel")).toBe(true);
    
})