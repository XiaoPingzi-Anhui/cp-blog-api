module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.json([
      { name: "Alexa", location: "New York City" },
      { name: "Jacek", location: "Hamburg" },
    ])
    response.send("DearXuan's API by nodejs!");
  } else {
    const { name, location } = req.body;

    res.send({ status: "User Created", name, location });
  }
}