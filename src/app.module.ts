import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { KelasModule } from './kelas/kelas.module';


@Module({
  imports: [CommonModule, UserModule, KelasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
