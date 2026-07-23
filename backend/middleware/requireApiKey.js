// Protects write operations (POST/PUT/DELETE) with a shared secret key.
// GET requests are never touched by this — your live site's product
// listing keeps working for every visitor with no key needed.
//
// The key itself lives only in Render's environment variables (ADMIN_API_KEY)
// and in your own Thunder Client requests — it is never committed to GitHub.
function requireApiKey(req, res, next) {
  const providedKey = req.header("x-api-key");

  if (!providedKey || providedKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: missing or incorrect API key",
    });
  }

  next();
}

module.exports = requireApiKey;