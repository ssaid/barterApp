


export type AuthData = {
  signed: boolean;
  username: string;
  token: string;
  handleLogin: ({token}) => void;
  handleLogout: () => void;
}

export type LoginToken = {
  access: string;
  refresh: string;
}
