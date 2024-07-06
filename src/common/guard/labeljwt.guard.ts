import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

Injectable();
export class LabelJwtGuard extends AuthGuard('labeljwt') {
  constructor() {
    super();
  }
}
