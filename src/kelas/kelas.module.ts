import {Module} from '@nestjs/common';
import { KelasController } from './kelas.controller';

@Module({
  imports: [],
  controllers: [KelasController],
  providers: [],
  exports: [],
})

export class KelasModule{}