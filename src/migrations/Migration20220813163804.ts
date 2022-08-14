import { Migration } from '@mikro-orm/migrations';

export class Migration20220813163804 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "customer" add column "username" varchar(255) not null;');
    this.addSql('alter table "customer" add constraint "customer_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "customer" drop constraint "customer_username_unique";');
    this.addSql('alter table "customer" drop column "username";');
  }

}
