import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Driver {
    @Field()
    @PrimaryKey()
    id!: number;

    @Field()
    @Property()
    name!: string;

    @Field()
    @Property({ default: true })
    available!: boolean;

}