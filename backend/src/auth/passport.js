const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { pool } = require('../db/db');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT id FROM oauth_users WHERE provider=? AND provider_id=?',
      ['google', profile.id]
    );
    let userId;
    if (rows.length > 0) {
      userId = rows[0].id;
    } else {
      const result = await conn.query(
        'INSERT INTO oauth_users(provider, provider_id) VALUES (?, ?)',
        ['google', profile.id]
      );
      userId = result.insertId;
    }
    await conn.query(
      'INSERT INTO oauth_tokens(user_id, access_token, refresh_token) VALUES (?, ?, ?)',
      [userId, accessToken, refreshToken]
    );
    done(null, { id: userId, providerId: profile.id });
  } catch (err) {
    done(err);
  } finally {
    if (conn) conn.release();
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
