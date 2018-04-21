export interface ServerConfig {
    port: number|string
};

export const serverConfig: ServerConfig = {
    port: process.env.PORT || 3000
};