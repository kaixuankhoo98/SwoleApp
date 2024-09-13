import { createServer, Factory, Model } from "miragejs";
import { faker } from "@faker-js/faker";
import { User } from "./types/user";

export const makeServer = ({ environment = "test" } = {}) =>
  createServer({
    environment,

    factories: {
      user: Factory.extend<Partial<User>>({
        id() {
          return faker.string.uuid();
        },
        firstName() {
          return faker.person.firstName();
        },
        lastName() {
          return faker.person.lastName();
        },
        username() {
          return faker.internet.userName();
        },
      }),
    },

    models: {
      user: Model,
    },

    routes() {
      this.namespace = "api";

      this.get("/user", () => {
        return {
          user: {
            id: 'asd2123shas',
            firstName: 'Kaixuan',
            lastName: 'Khoo',
            username: 'MoonMoon1590'
          }
        }
      })

      this.get("/users", (schema) => {
        console.log(schema.all('user'))
        return schema.all("user");
      });
    },

    seeds(server) {
      server.createList("user", 20); // Create 20 users for the test database
    },
  });
