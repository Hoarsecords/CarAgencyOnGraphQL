import { Migration } from '@mikro-orm/migrations';

export class Migration20220814193715 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "car" ("id" serial primary key, "model" varchar(255) not null, "available" boolean not null default true);');

    this.addSql('create table "driver" ("id" serial primary key, "name" varchar(255) not null, "available" boolean not null default true);');

    this.addSql('create table "reservations" ("customer_id" int not null, "car_id" int not null, "driver_id" int not null, constraint "reservations_pkey" primary key ("customer_id", "car_id", "driver_id"));');
    this.addSql('alter table "reservations" add constraint "reservations_customer_id_unique" unique ("customer_id");');
    this.addSql('alter table "reservations" add constraint "reservations_car_id_unique" unique ("car_id");');
    this.addSql('alter table "reservations" add constraint "reservations_driver_id_unique" unique ("driver_id");');

    this.addSql('alter table "reservations" add constraint "reservations_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update cascade;');
    this.addSql('alter table "reservations" add constraint "reservations_car_id_foreign" foreign key ("car_id") references "car" ("id") on update cascade;');
    this.addSql('alter table "reservations" add constraint "reservations_driver_id_foreign" foreign key ("driver_id") references "driver" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "reservations" drop constraint "reservations_car_id_foreign";');

    this.addSql('alter table "reservations" drop constraint "reservations_driver_id_foreign";');

    this.addSql('drop table if exists "car" cascade;');

    this.addSql('drop table if exists "driver" cascade;');

    this.addSql('drop table if exists "reservations" cascade;');
  }

}
