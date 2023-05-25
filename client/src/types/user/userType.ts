export type ActiveType = UserFromBackend & {
  status: 'active';
};

export type FetchingUserType = {
  status: 'fetching';
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
  isAdmin: boolean;
  confirmed: boolean;
};
