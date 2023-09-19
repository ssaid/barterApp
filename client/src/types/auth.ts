


export type AuthData = {
  signed: boolean;
  token: string;
  handleLogin: ({token}) => void;
  handleLogout: () => void;
}

export type LoginToken = {
  access: string;
  refresh: string;
}
