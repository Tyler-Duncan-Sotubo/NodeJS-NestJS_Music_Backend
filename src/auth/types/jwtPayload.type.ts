export type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  shouldRemember: boolean;
  role: string;
};
