import express from 'express';
import TokenManager from "./Managers/TokenManagement/TokenManager.js";
import TokenModel from "./Models/TokenModel/TokenModel.js";
import cors from "cors";
import UserManager from "./Managers/UserManager/UserManager.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
