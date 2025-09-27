import { app } from './app.js';
import { env } from './env/index.js';

app.listen({
    host: env.HOST,
    port: env.PORT,
}).then(() => {
    console.log(`HTTP server running on http://${env.HOST}:${env.PORT}`);
})
