import { Migration } from '@mikro-orm/migrations';

export class Migration20220813113658 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "customer" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "age" int not null, "credit_card" varchar(255) null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "customer" cascade;');
  }

}
