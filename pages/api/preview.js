export default async (req, res) => {
  const secret = process.env.PREVIEW_SECRET;

  // Check the secret and next parameters
  if (secret && req.query.secret !== secret) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setPreviewData({});

  res.redirect(req.query.slug)
  res.end();
};