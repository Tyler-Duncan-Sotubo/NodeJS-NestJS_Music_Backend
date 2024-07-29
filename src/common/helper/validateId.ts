import { ForbiddenException } from '@nestjs/common';

export const validateId = (id: string) => {
  const hexRegex = /^[a-fA-F0-9]{24}$/;
  const result = hexRegex.test(id);
  if (!result) {
    throw new ForbiddenException('Invalid Id');
  }
};
