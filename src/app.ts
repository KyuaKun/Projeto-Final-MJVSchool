import app from "./server";
import { environment } from "./config/environment";

const port = environment.serverPort;
const link = `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`CTRL + CLICK: ${link} `);
});
