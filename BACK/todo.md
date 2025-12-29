2️⃣ First change: split tokens by purpose

Right now:

expiresIn: '7d'

❌ This is too long for an access token.

Change to:
// access token
export const generateAccessToken = (userId) => {
return sign({ userId }, process.env.JWT_ACCESS_SECRET, {
expiresIn: '10m'
});
};

You will also need:

JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...

3️⃣ Add a refresh token (NEW)
Generate refresh token
export const generateRefreshToken = (userId) => {
return sign({ userId }, process.env.JWT_REFRESH_SECRET, {
expiresIn: '7d'
});
};

Refresh token is never sent in JSON
It goes into an HttpOnly cookie

4️⃣ Update loginUser
Before (now)
const token = generateToken(user.\_id);
return res.status(200).json({ user, token });

After (correct)
const accessToken = generateAccessToken(user.\_id);
const refreshToken = generateRefreshToken(user.\_id);

res.cookie('refreshToken', refreshToken, {
httpOnly: true,
secure: true, // required cross-domain
sameSite: 'none', // required cross-domain
path: '/auth/refresh'
});

return res.status(200).json({
message: OK.user.loggedIn,
user,
accessToken
});

🚫 Do not send refresh token to frontend JS

5️⃣ Add /auth/refresh endpoint (NEW)
export const refreshAccessToken = (req, res, next) => {
try {
const refreshToken = req.cookies.refreshToken;
if (!refreshToken) throw customError(401, 'NO_REFRESH_TOKEN');

    const { userId } = verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken(userId);

    return res.json({ accessToken: newAccessToken });

} catch (err) {
next(err);
}
};

This endpoint:

Reads cookie

Verifies refresh token

Issues new access token

Frontend updates memory token

6️⃣ Add logout (YES, backend must help)

Frontend-only logout is not enough once cookies exist.

Logout endpoint
export const logoutUser = (req, res) => {
res.clearCookie('refreshToken', {
httpOnly: true,
secure: true,
sameSite: 'none',
path: '/auth/refresh'
});

res.status(200).json({ message: OK.user.loggedOut });
};

Frontend still clears access token from memory.

7️⃣ CORS config (you MUST change this)

Current:

cors({
origin: process.env.FRONTEND_URL || '\*'
})

❌ This will break cookies.

Change to:
app.use(cors({
origin: process.env.FRONTEND_URL,
credentials: true
}));

And ensure:

app.use(cookieParser());
