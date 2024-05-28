
export interface Configuration {
    port: number,
    database: {
        host: string
    }
}

export default () : Configuration => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
    }
});