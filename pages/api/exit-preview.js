export default async (req, res) => {
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' })
  res.end()
}