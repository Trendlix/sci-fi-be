import app from "./app";
import connectDB from "./db/connection";
import env from "./shared/config/env";

connectDB().then(() => {
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
});
