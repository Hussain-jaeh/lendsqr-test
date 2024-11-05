import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw'; 
import { setupServer } from 'msw/node';
import Users from '../pages/users/Users';

const server = setupServer(
  http.get(`${process.env.REACT_APP_API_URL}/users`, () => {
    return HttpResponse.json({ orgName: 'helloworld' });
  })
);

beforeAll(() => server.listen()); 
afterEach(() => server.resetHandlers()); 
afterAll(() => server.close()); 

describe('Users list component', () => {
  it('should display users stats and table after fetching users data from API', async () => {
    render(<Users />); 

   
    const usersStats = screen.getByTestId('users-stats');
    expect(usersStats).toBeInTheDocument();

 
    await waitFor(() => {
      const table = screen.getByTestId('user-table');
      expect(table).toBeInTheDocument();
    });
  });
});