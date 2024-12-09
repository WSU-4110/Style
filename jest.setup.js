import '@testing-library/jest-dom';

// mock Next.js router to avoid errors in tests
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));
