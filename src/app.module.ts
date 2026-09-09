import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from './organizations/organizations.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'forgehub',
      password: 'forgehub',
      database: 'forgehubdb',
      autoLoadEntities: true,
      synchronize: true,
    }), UserModule, OrganizationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
