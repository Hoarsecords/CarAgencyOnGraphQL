import { Migration } from '@mikro-orm/migrations';

export class Migration20220813160158 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "customer" add column "password" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "customer" drop column "password";');
  }

}
