import { DefaultSession, DefaultUser } from 'next-auth';

// Extending the User and Session types from next-auth
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string; // Optional id
      accessToken?: string; // Optional accessToken
    } & DefaultSession['user']; // Extending the default user properties
  }

  interface User {
    id?: string; // Optional id
    token?: string; // Optional accessToken
  }
}
