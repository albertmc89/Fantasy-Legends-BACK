# TypeScript Project with JWT Authentication :yellow_circle: :white_circle:

This is a TypeScript project that includes JWT authentication, unit tests, and endpoint tests to ensure reliable and secure functionality.

## Features

- **JWT Authentication:** The application uses JSON Web Tokens (JWT) to authenticate users and secure protected routes.

- **Unit Tests:** Comprehensive unit tests have been implemented to verify the functionality of various parts of the code.

- **Endpoint Tests:** Endpoint tests ensure that API routes and functionality work correctly.

- **100% Coverage:** The project has 100% test coverage to ensure that all parts of the code are tested and functioning.

- **Postman Endpoint Collection:** A collection of Postman endpoints is provided, exported as JSON in the project's root directory, to facilitate testing and API documentation.

## Usage

Below are the available endpoints along with their methods, URLs, request bodies, and responses:

### Endpoint:

GET`/players`

- :green_circle: status 200, message: "Players successfully loaded"
- :red_circle: status 404 "Couldn't retrieve players"
  DELETE`/players`
- :green_circle: status 200, message: "Player successfully deleted"
- :red_circle: status status 500, message: "Can't delete player"
  ADD `/players/idPlayer`
- :green_circle: status 201, message: "Player successfully added"
- :red_circle: status 404, message: "Couldn't create the player"
  GET`/players/:idPlayer`
- :green_circle: status 200, message: "Player successfully loaded"
- :red_circle: status 500, message: "Can't retrieve player"
  PATCH`/:idPlayer`
- :green_circle: status 200, message: "Player successfully modified"
- :red_circle: status 500, message: "Couldn't modify the player"

- **Method:** `POST`,`DELETE`,`PATCH`,`GET`
- **URL:** `/api/endpoint`

# Testing

To ensure the reliability and functionality of this project, we have implemented testing procedures. Please follow the instructions below to run the tests.

## Unit Tests

To run unit tests, use the following command:

```bash
npm test
```

## Test Coverage

We maintain a test coverage of 100% to ensure that all code parts are tested and functional. To generate a coverage report, use the following command:

```bash
npm run test:coverage
```

[Sonar-back-final2023]https://cdn.discordapp.com/attachments/1149732795334266962/1154120471374213282/Sonar-back-final2023.png

## Contribution

If you wish to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your contribution: `git checkout -b feature/new-feature`.
3. Make your changes and ensure that tests (unit and endpoint) pass.
4. Commit your changes: `git commit -m "Add a new feature"` and then `git push origin feature/new-feature`.
5. Open a pull request on GitHub.
