
```markdown
# Blog Data API Project

This is a simple Express.js project that provides two API endpoints for retrieving and searching blog data. It also includes caching of the retrieved data using Lodash's `memoize` function.

## Installation

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your system.

### Steps

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/2001sahil/Caching_Data.git
   ```


2. Install project dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root directory and add your API secret:

   ```env
   SECRET=your_api_secret_here
   ```

   Replace `your_api_secret_here` with the actual API secret.

4. Start the server:

   ```bash
   node App.js
   ```

   The server will start on port 3000 by default.

## API Endpoints

### 1. Retrieve Blog Data

- **Endpoint:** `/api/blog-status`
- **HTTP Method:** GET
- **Description:** Retrieves and returns blog data.
- **Caching:** The data is cached to prevent re-fetching within a specified time frame.

#### Example Usage

```bash
curl http://localhost:3000/api/blog-status
```

### 2. Search Blog Data

- **Endpoint:** `/api/blog-search?query=query`
- **HTTP Method:** GET
- **Description:** Searches for blog data based on the provided query.
- **Parameters:** Replace `query` with your search query.
- **Caching:** The data is cached to prevent re-fetching within a specified time frame.

#### Example Usage

```bash
curl http://localhost:3000/api/blog-search?query=privacy
```

## Notes

- Ensure that you have set the `SECRET` in the `.env` file with your API secret.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
