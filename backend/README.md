## Prerequisites

To run the applications, you need to install dependencies:

1. Install bun
2. Install packages
   ```sh
   # try this first
   bun install --frozen-lockfile
   # if failed, use this and commit the lock file
   bun install
   ```

After that, fill secrets in `.env` file using the following format:

```env
API_TOKEN=xxxxx
X_BV_ORG_ID=xxxxx
```

## Development

To start the development server run:

```bash
bun run dev
```
