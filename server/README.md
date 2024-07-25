## Backend (Server)


### Details

- **controllers/specieController.ts**: Handles requests related to species (e.g., getting species data and saved species).
- **models/specie.ts**: Defines the `Specie` TypeScript interface.
- **routes/defaultRoutes.ts**: Defines default routes including a welcome message and a 404 handler.
- **routes/specieRoutes.ts**: Defines species-related routes linked to controller functions.
- **services/apiService.ts**: Contains functions to fetch regions, species by region, and conservation measures.
- **services/dbService.ts**: Manages database operations, including initializing, saving, and retrieving species data (SQLite).
- **services/utils.ts**: Provides utility functions (e.g., `getRandomElement`).
- **server.ts**: Main server entry point. Sets up the Express server, initializes the database, and defines middleware and routes.

### Endpoints

- `GET /api/species`: Fetch species data from a static list.
- `GET /api/species/saved`: Fetch all saved species from the database.
- `GET /`: Default route, displays a welcome message.