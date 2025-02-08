import { Controller, Param, Post } from '@nestjs/common';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {
  constructor(private readonly activationService: ActivationService) { }
  @Post('user/:hash')
  activateUser(@Param('hash') hash: string) {
    return this.activationService.userActivate(hash)
  }
}
