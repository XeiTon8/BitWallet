import React from 'react'
import { render, cleanup, getByTestId, fireEvent } from '@testing-library/react';
import  { AuthForm } from './index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it("should be disabled", () => {
    const { getByTestId } = render(<AuthForm />);
    expect(getByTestId("confirm-btn")).toBeDisabled()
});