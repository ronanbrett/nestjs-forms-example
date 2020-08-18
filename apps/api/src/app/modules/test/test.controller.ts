import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  Request
} from '@nestjs/common';
import { random } from 'faker';
import { of } from 'rxjs';

@Controller('test')
export class TestController {
  @Post('verify')
  async verify(@Req() req: Request) {
    console.log(req.body);

    let { securities } = req.body as any;

    await new Promise(res =>
      setTimeout(() => res(), random.number({ min: 0, max: 2 }) * 1000)
    );

    await new Promise(res => setTimeout(() => res(), 2000));

    securities.map(x => (x.valid = true));

    if (random.boolean()) {
      throw new BadRequestException();
    }
    return securities;
  }

  @Post('upload')
  async upload(@Req() req: Request) {
    console.log(req.body);

    let { securities } = req.body as any;

    await new Promise(res =>
      setTimeout(() => res(), random.number({ min: 0, max: 2 }) * 1000)
    );

    securities.map(x => (x.uploaded = random.boolean()));

    return securities;
  }
}
