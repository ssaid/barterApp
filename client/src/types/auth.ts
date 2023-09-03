


export type AuthData = {
  signed: boolean;
  username: string;
  token: string;
  handleLogin: ({username, token}) => void;
  handleLogout: () => void;
}
