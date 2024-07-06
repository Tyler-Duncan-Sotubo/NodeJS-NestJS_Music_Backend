export const user = {
  id: '1',
  name: 'John Doe',
  email: 'test@test.com',
  hash: '2978312',
  role: 'USER',
};
export const getUserByEmailDto = { email: 'test@test.com' };
export const getUserByIdDto = { id: '1' };

export const PasswordResetDto = {
  token: '123456',
  email: 'test@test.com',
  password: '123456',
  password_confirmation: '123456',
};

export const RegisterDto = {
  name: 'Mike',
  email: 'test@test.com',
  password: '123456',
  password_confirmation: '123456',
};

export const LoginDto = {
  email: 'test@test.com',
  password: '123818278',
  shouldRemember: false,
};

export const tokens = {
  accessToken: '3812639812698163912',
  refreshToken: '9712031297210',
};
