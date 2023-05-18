export type LoggedType = UserFromBackend & {
  status: 'logged';
};

export type FetchingUserType = {
  status: 'fetching';
};

export type GuestType = {
  status: 'guest';
};

export type UserType = GuestType | FetchingUserType | LoggedType;

export type UserFromBackend = {
  id: number;
  email: string;
  name: string;
};
