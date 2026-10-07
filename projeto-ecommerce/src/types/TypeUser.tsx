export type User = {
  id: string;
  email: string;
  username?: string;
  role: "user" | "admin";
};

export type TypeAuthContext = {
  user: User | null;
  isAdmin: boolean;
  logout: () => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
