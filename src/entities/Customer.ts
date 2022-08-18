import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Customer {
    @Field()
    @PrimaryKey()
    id!: number;

    @Field()
    @Property()
    name!: string;

    @Field()
    @Property()
    email!: string;

    @Field()
    @Property()
    age?: number;

    @Field()
    @Property({ unique: true })
    username!: string;

    @Field()
    @Property({ type: "text" })
    password!: string;

    @Field()
    @Property({ nullable: true })
    creditCard?: string;


}