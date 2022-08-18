import { Resolver, Query, Ctx, Arg, Mutation, ObjectType, Field, UseMiddleware } from "type-graphql";
import { MyContext } from "src/type";
import { Customer } from "../entities/Customer";
import argon2 from 'argon2';
import { createAccessToken } from "../utils/auth";
import { isAuth } from "../utils/isAuth";
@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => Customer)
    customer: Customer;
}

@Resolver()
export class CustomerResolver {
    @Query(() => String)



    @Query(() => [Customer])
    // @UseMiddleware(isAuth)
    // getAllCustomers(@Ctx() { em }: MyContext): Promise<Customer[]> {
    //     return em.find(Customer, {});
    // }
    @Query(() => Customer, { nullable: true })
    // @UseMiddleware(isAuth)
    // getCustomer(@Arg('id', () => Int) id: number, @Ctx() { em }: MyContext): Promise<Customer | null> {
    //     return em.findOne(Customer, { id });
    // }

    @Mutation(() => Number)
    async register(
        @Arg('name', () => String) name: string,
        @Arg('username', () => String) username: string,
        @Arg('email', () => String) email: string,
        @Arg('age', () => Number) age: number,
        @Arg('creditCard', () => String, { nullable: true }) creditCard: string,
        @Arg('password', () => String) password: string,
        @Ctx() { em }: MyContext
    ) {

        const hashedPassword = await argon2.hash(password);
        const hashedCreditCardNumber = await argon2.hash(creditCard);
        try {
            const customer = em.create(Customer, { username, name, email, age, creditCard: hashedCreditCardNumber, password: hashedPassword });
            await em.persistAndFlush(customer);
            return customer.id;

        } catch (error) {
            console.log(error);
            return -1;
        }
    }


    // @Mutation(() => Customer, { nullable: true })
    // async updateCustomer(@Arg('id', () => Number) id: number, @Arg('creditCard', () => String) creditCard: string, @Ctx() { em }: MyContext): Promise<Customer | null> {
    //     const customer = await em.findOne(Customer, { id });
    //     if (!Customer) {
    //         return null;
    //     }
    //     if (typeof creditCard !== 'undefined') {
    //         const hashedCreditCardNumber = await argon2.hash(creditCard);
    //         if (customer != null) {
    //             customer.creditCard = hashedCreditCardNumber;
    //             await em.persistAndFlush(customer);
    //         }

    //     }
    //     return customer;
    // }

    @Mutation(() => Boolean)
    async deleteCustomer(@Arg('id', () => Number) id: number, @Ctx() { em }: MyContext): Promise<Boolean | null> {
        const customer = await em.findOne(Customer, { id });
        if (!customer) {
            return false;
        }
        em.remove(customer);
        await em.flush();
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(@Arg('username', () => String) username: string, @Arg('password', () => String) password: string, @Ctx() { em }: MyContext) {
        const customer = await em.findOne(Customer, { username: username })
        if (!customer) {
            throw new Error("could not find customer");
        }

        const valid = await argon2.verify(customer.password, password);

        if (!valid) {
            throw new Error("bad password");
        }
        // Login is successfull


        return {
            accessToken: createAccessToken(customer),
            customer
        }

    }

}