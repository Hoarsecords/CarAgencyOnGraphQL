import { Resolver, Ctx, Mutation, ObjectType, Field, UseMiddleware } from "type-graphql";
import { MyContext } from "src/type";
import { isAuth } from "../utils/isAuth";
import { Reservation } from "../entities/Reservation";
import { Driver } from "../entities/Driver";
import { Car } from "../entities/Car";
import { Customer } from "../entities/Customer";
import e from "express";

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class ReservationResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Reservation, { nullable: true })
    reservation?: Reservation;
}

@Resolver()
export class ReservationResolver {
    @Mutation(() => ReservationResponse)
    @UseMiddleware(isAuth)
    async reserve(@Ctx() { em, payload }: MyContext): Promise<ReservationResponse> {
        const driver = await em.findOne(Driver, { available: true });
        if (!driver) {
            return {
                errors: [{
                    field: 'driver',
                    message: 'No driver is available'
                }]
            }
        }
        const car = await em.findOne(Car, { available: true })
        if (!car) {
            return {
                errors: [{
                    field: 'car',
                    message: 'No car is available'
                }]
            }
        }
        const customer = await em.findOne(Customer, { username: payload?.username });
        if (!customer) {
            return {
                errors: [{
                    field: 'customer',
                    message: 'No customer is that username'
                }]
            }
        }
        car.available = false;
        driver.available = false;
        await em.persistAndFlush(car);
        await em.persistAndFlush(driver);
        const reservation = em.create(Reservation, { driver: driver, car: car, customer: customer })
        await em.persistAndFlush(reservation);
        return { reservation };
    }
}