import { createServer, Factory, Model } from "miragejs";
import { faker } from "@faker-js/faker";
import { User } from "./types/user";
import dayjs from "dayjs";
import { Workout } from "./types/workout";

const getQueryParam = (
  param: string | string[] | null | undefined
): string | null | undefined => {
  return Array.isArray(param) ? param[0] : param;
};

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

      workout: Factory.extend<Partial<Workout>>({
        date() {
          return dayjs(
            faker.date.between({
              from: dayjs().subtract(3, "month").toDate(),
              to: dayjs().toDate(),
            })
          );
        },


      }),
    },

    models: {
      user: Model,
      workout: Model,
    },

    routes() {
      this.namespace = "api";

      this.get("/user", () => {
        return {
          user: {
            id: "asd2123shas",
            firstName: "Kaixuan",
            lastName: "Khoo",
            username: "MoonMoon1590",
          },
        };
      });

      this.get("/users", (schema) => {
        console.log(schema.all("user"));
        return schema.all("user");
      });

      this.get("/workouts", (schema, request) => {
        const requestDate = dayjs(getQueryParam(request.queryParams.date));
        const data = schema.where('workout', workout => workout.date?.month() === requestDate.month() ).models
        return data.map((workout) => workout.date?.date())
      })

    },

    seeds(server) {
      server.createList("user", 20); // Create 20 users for the test database
      server.createList('workout', 50);
    },
  });
