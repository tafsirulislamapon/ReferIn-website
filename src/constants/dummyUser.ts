export type UserRole = 'seeker' | 'referer';

interface DummyUser {
  role: UserRole;
}

export const dummyUser: DummyUser = {
  role: 'seeker'  // Just change this to 'referer' to test the other view
};
