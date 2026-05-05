# Telegram bot template

Simple project template using grammy.js

## Scripts
- `npm run format` - format files using prettier
- `npm run typecheck` - find errors in typing
- `npm run build` - compile project
- `npm run dev` - run in development mode
- `npm run start` - run in production mode
- `npm run start:force` - skip typechecking and run

## Tech stack
- grammY - Telegram bot API
- Typescript - type checking
- Zod - validation
- pino - logging
- prettier - formatting

## Project structure
```
TEMPLATE-BOT
│   .env.example
│   .gitattributes
│   .gitignore
│   .prettierrc
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│   
└───src
    │   config.ts
    │   logger.ts
    │   main.ts
    │   
    └───bot
        │   index.ts
        │   
        ├───callback-data
        ├───features
        ├───handlers
        ├───keyboards
        └───midddlewares
```
