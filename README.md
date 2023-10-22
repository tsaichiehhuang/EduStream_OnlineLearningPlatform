# EduStream Platform

### Demo

[Website URL](https://edustream-online-learning-platform.vercel.app)
### Deployment

1. Install packages:
   1. for backend:

    ```ssh
    cd backend
    bun install
    ```

   2. for frontend:

    ```ssh
      cd frontend
      npm install
      ```

3. Start MySQL server
4. Import database:
    1. `mysql -u <user_name> -p <edustream_db_name> < ./backend/config/database/edustream.sql`
5. Create config:
    1. `./backend/.env` for backend (Copy the schema from template: `./backend/.env-template`)
       1. set `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST` for MySQL server
       2. set `JWT_SECRET` for jwt
       3. set `BCRYPT_SALT` for password encryption
       4. set `API_TOKEN` and `X_BV_ORG_ID` for BlendVisiion API
    2. `./frontend/.env` for frontend (Copy the schema from template: `./frontend/.env-template`)
       1. set `API_DOMAIN` for back-end server URL
       2. set `OPENAI_API_KEY` for OpenAI API
6. Start server:
   1. Start backend server:

   ```ssh
    cd backend
    bun run start
   ```

    2. Start frontend server:

    ```ssh
      cd frontend
      npm run dev
    ```

### Tech Stack

1. Backend: Bun, Elysia, TypeScript
2. Frontend: npm, Next.js, TypeScript
3. Database: MySQL, TypeORM
4. API: BlendVision, OpenAI
5. Deployment: EC2 (for backend), Vercel (for frontend)
