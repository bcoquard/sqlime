import { InMemoryDbService } from "angular-in-memory-web-api";

export class DatabasesInMemoryDataService implements InMemoryDbService {
  createDb() {
    let databases = [
      {
        id: 1,
        connectionName: "MySQL DEV",
        jdbcConnectionUrl: "jdbc:mysql://mysql.dev.domaine.fr",
        jdbcConnectionPort: "3306",
        databaseName: "ODS",
        username: "root",
        password: "password"
      },
      {
        id: 2,
        connectionName: "MariaDB DEV",
        jdbcConnectionUrl: "jdbc:mysql://mariadb.dev.domaine.fr",
        jdbcConnectionPort: "3306",
        databaseName: "REF",
        username: "root",
        password: "password"
      }
    ];

    return { databases };
  }
}
