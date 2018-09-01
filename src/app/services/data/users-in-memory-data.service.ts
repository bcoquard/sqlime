import { InMemoryDbService } from "angular-in-memory-web-api";

export class UsersInMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {
        id: 1,
        email: "test",
        password: "test",
        firstName: "test",
        lastName: "test"
      }
    ];

    return { users };
  }
}
