import express from 'express';
import TokenManager from "./Managers/TokenManagement/TokenManager.js";
import TokenModel from "./Models/TokenModel/TokenModel.js";
import cors from "cors";
import UserManager from "./Managers/UserManager/UserManager.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

/**
 *
 */
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const data = await UserManager.login(email, password);
        res.status(200).send(data);
    }
    catch (_) {
        res.status(400).send('Invalid credentials')
    }
});

/**
 *
 */
app.post('/token-login', TokenManager.verifyRefreshToken, async (req, res) => {
    try {
        const refreshToken = (req.headers.authorization).split(' ')[1];
        const tokenInfo = TokenManager.refreshTokenInfo(refreshToken);
        TokenModel.invalidateToken(tokenInfo.tokenUid);
        const newJwt = TokenManager.generateJwt(tokenInfo.userUid);
        const newRefreshToken = await TokenManager.generateRefreshToken(tokenInfo.userUid);
        res.status(200).send(
            {
                jwt: newJwt,
                refreshToken: newRefreshToken
            }
        );
    }
    catch (_) {
        res.status(401).send('Unauthorized');
    }
});

/**
 * créer un nouvel utilisateur et renvoi les informations à l'utilisateur avec un jwt et refresh
 */
app.post('/register', async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;

        let validity = {username: false, password: false, email: false}

        if ((/^[\w\-\.]+@(?:[\w-]+\.)+[\w-]{2,4}$/).test(email)) {
            validity = {...validity, email: true}
        }

        if ((/^[\w]{4,32}$/).test(username)) {
            validity = {...validity, username: true}
        }

        if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,32}$/).test(password)) {
            validity = {...validity, password: true}
        }

        const allTrue = Object.values(validity).every(Boolean);

        if (allTrue) {
            const info = await UserManager.register(username, email, password);
            res.status(200).send(info)
        }
        else {
            res.status(401).send(validity)
        }
        
    }
    catch (_) {
        res.status(500).send('An error occured on the server');
    }
});

/**
 * take a refresh token from an authorization header and remove it from the db
 * whatever code it returns user have to disconnect
 */
app.post('/logout', TokenManager.verifyRefreshToken, (req, res) => {
    try {
        const refreshToken = (req.headers.authorization).split(' ')[1];
        const tokenId = TokenManager.refreshTokenInfo(refreshToken).tokenUid;
        TokenModel.invalidateToken(tokenId);
        res.status(200).send();
    }
    catch (_) {
        res.status(401).send('Unauthorized');
    }
});

/**
 * return 200 if the jwt is valid
 * 401 otherwise
 */
app.post('/jwt-validation', (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        TokenManager.jwtInfo(token)
        res.status(200).send()
    } catch (error) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
});

/**
 * return 200 and the new jwt
 * 401 if the refresh token became invalid
 */
app.post('/refresh-jwt', TokenManager.verifyRefreshToken, (req, res) => {
    try {
        const refreshToken = (req.headers.authorization).split(' ')[1];
        const userId = TokenManager.refreshTokenInfo(refreshToken).userUid;
        res.status(200).send({jwt: TokenManager.generateJwt(userId)});
    }
    catch (_) {
        res.status(401).send('Unauthorized');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
