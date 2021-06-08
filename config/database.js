module.exports = {
    development: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PWD || 'postgres',
        database: process.env.DB_NAME || 'last_respects_dev',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432',
        dialect: 'postgres',
        operatorsAliases: false,
    },
    test: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PWD || 'postgres',
        database: process.env.DB_NAME || 'last_respects_dev',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,
    },
    staging: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME || 'last_respects_staging',
        host: process.env.DB_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME || 'last_respects',
        host: process.env.DB_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
    },
};
