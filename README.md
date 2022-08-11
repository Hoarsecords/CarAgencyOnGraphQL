## Technical Requirements

1. [Node.js](https://nodejs.org/en/)
2. [Apollo Server Express](https://www.npmjs.com/package/apollo-server-express)
3. [TypeScript](https://www.typescriptlang.org/)
4. [GraphQL](https://graphql.org/)
5. [Jest](https://jestjs.io/)
6. [JWT](https://jwt.io/)

## Project Background

You are required to create a GraphQL server on Apollo Server Express via TypeScript and an SQL database, preferably
MySQL or PostgreSQL.

This exercise will ensure you are a good fit to Hoarsecords as it will test your skills in a similar stack to the
one we use in the company.


## Project Overview

This project is for a car rental agency, the company is expected to have multiple branches and multiple cars.
Customers are to be able to book a car, and drivers are to be able to drive a car.

In order for a customer to book a car, they must be logged in and have a credit card on file. A driver AND a car
must both be available at the time of the customer booking. Once the customer books, the car and driver are both
considered to be reserved.

You are requested to create ONLY the backend side (zero frontend work) of the application. You will be responsible for
creating users, cars, drivers and bookings. You must validate your data and show how your validation makes sense and
ensures the success/sanity of your project.


Your code must be test-driven, and must be able to run in a production environment. So scalability, performance and 
reliability are important.

## Requirements

1. Fork this repository.
2. Setup a GraphQL server on Apollo Server Express via TypeScript and an SQL database, preferably MySQL or PostgreSQL.
3. Create tests via jest.
4. Ensure your connection to the database is fine.
5. Create your schema and resolvers.
6. Ensure your connection to the database is fine.
7. Create your database schema and connect it to the GraphQL schema.
8. Ensure your resolvers fit your test requirements 
(i.e: your resolver that creates a user fits your test of creating a user)
9. Create a PR with your project once you're done - you must show that your tests are successful.

The quality of your tests and their successes are the only thing that matters throughout this project. Your tests should
not only test for sanity, but also for performance. Both literal coverage (amount of code covered) and logical coverage
(important logical aspects such as performance) are important. The tests should be as thorough as possible, as the 
quality of the code depends on it.