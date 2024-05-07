export type SignInType = {
  role: string;
  username: string;
  password: string;
};

export type SubmitType = {
  username: string;
  password: string;
};

export type AuthType = {
  title: string;
  switchTitle?: string;
  switchRoute?: string;
  postRoute: string;
  pushRoute: string;
};
