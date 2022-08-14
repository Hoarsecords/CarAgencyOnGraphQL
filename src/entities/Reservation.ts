import { Entity, PrimaryKey, Property, OneToOne, PrimaryKeyType } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Car } from "./Car";
import { Customer } from "./Customer";
import { Driver } from "./Driver";
@ObjectType()
@Entity()
export class Reservation {
    @Field()
    @OneToOne({ primary: true })
    customer!: Customer;

    @Field()
    @OneToOne({ primary: true })
    car!: Car;

    @Field()
    @OneToOne({ primary: true })
    driver!: Driver;
}