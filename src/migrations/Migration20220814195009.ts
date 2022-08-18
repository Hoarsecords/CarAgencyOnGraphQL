import { Migration } from '@mikro-orm/migrations';

export class Migration20220814195009 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "reservation" ("customer_id" int not null, "car_id" int not null, "driver_id" int not null, constraint "reservation_pkey" primary key ("customer_id", "car_id", "driver_id"));');
    this.addSql('alter table "reservation" add constraint "reservation_customer_id_unique" unique ("customer_id");');
    this.addSql('alter table "reservation" add constraint "reservation_car_id_unique" unique ("car_id");');
    this.addSql('alter table "reservation" add constraint "reservation_driver_id_unique" unique ("driver_id");');

    this.addSql('alter table "reservation" add constraint "reservation_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update cascade;');
    this.addSql('alter table "reservation" add constraint "reservation_car_id_foreign" foreign key ("car_id") references "car" ("id") on update cascade;');
    this.addSql('alter table "reservation" add constraint "reservation_driver_id_foreign" foreign key ("driver_id") references "driver" ("id") on update cascade;');

    this.addSql('drop table if exists "reservations" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "reservations" ("customer_id" int not null, "car_id" int not null, "driver_id" int not null, constraint "reservations_pkey" primary key ("customer_id", "car_id", "driver_id"));');
    this.addSql('alter table "reservations" add constraint "reservations_customer_id_unique" unique ("customer_id");');
    this.addSql('alter table "reservations" add constraint "reservations_car_id_unique" unique ("car_id");');
    this.addSql('alter table "reservations" add constraint "reservations_driver_id_unique" unique ("driver_id");');

    this.addSql('alter table "reservations" add constraint "reservations_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update cascade;');
    this.addSql('alter table "reservations" add constraint "reservations_car_id_foreign" foreign key ("car_id") references "car" ("id") on update cascade;');
    this.addSql('alter table "reservations" add constraint "reservations_driver_id_foreign" foreign key ("driver_id") references "driver" ("id") on update cascade;');

    this.addSql('drop table if exists "reservation" cascade;');
  }

}
