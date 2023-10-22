# EduStream Platform

### Deployment

1. Install packages: `bun install`
2. Start MySQL server
3. Import database:
    1. `mysql -u <user_name> -p <edustream_db_name> < edustream.sql`
    2. `mysql -u <user_name> -p <edustream_test_db_name> < edustream_test.sql` (Optional)
4. Create config:
    1. `/backend/.env` for back-end (Copy the schema from template: `/backend/.env-template`)
       1. set `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST` for MySQL server
       2. set `JWT_SECRET` for jwt
       3. set `BCRYPT_SALT` for password encryption
       4. set `API_TOKEN` and `X_BV_ORG_ID` for BlendVisiion API
    2. `/frontend/.env` for front-end (Copy the schema from template: `/frontend/.env-template`)
       1. set `API_DOMAIN` for back-end server URL
       2. set `OPENAI_API_KEY` for OpenAI API
5. Start server:
   1. Start back-end server:

   ```ssh
    cd backend
    bun run start
   ```

    2. Start front-end server:

    ```ssh
      cd frontend
      npm run dev
    ```

### Tech Stack

1. Backend: Bun + Elysia
2. Frontend: Next.js
3. Database: MySQL
4. API: BlendVision, OpenAI
5. Deployment: EC2 (for backend), Versel(for front end)

### Demo

[Website URL](https://edustream-online-learning-platform.vercel.app)
