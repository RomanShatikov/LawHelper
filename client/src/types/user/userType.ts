export type ActiveType = UserFromBackend & {
  status: 'active';
};

export type FetchingUserType = {
  status: 'fetching';
  isAdmin: false;
};

export type GuestType = {
  status: 'guest';
};

export type NonActiveType = UserFromBackend & {
  status: 'non-active';
};

export type UserType = ActiveType | GuestType | FetchingUserType | NonActiveType;

export type UserFromBackend = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hashpass: string;
  isAdmin: boolean;
  confirmed: boolean;
};
