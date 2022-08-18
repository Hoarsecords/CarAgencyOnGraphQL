import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Car {
    @Field()
    @PrimaryKey()
    id!: number;

    @Field()
    @Property()
    model!: string;

    @Field()
    @Property({ default: true })
    available!: boolean;

}