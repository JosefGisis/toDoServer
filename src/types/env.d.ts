declare namespace NodeJS {
    export interface ProcessEnv {
        DB_HOST: string,
        DB_USERNAME: string,
        DB_PASSWORD: string, 
        DB_DATABASE: string,
        DB_PORT: string,
        JWT_KEY: string,
        NODE_ENV: 'development' | 'production'
    }
}