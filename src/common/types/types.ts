export type TUser = {
  account_id: number;
  account: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  user_type?: String;
};

export type TUserAccount = { account_id?: number; password?: string };
