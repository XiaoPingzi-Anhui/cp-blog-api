module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.json([
      { name: "Alexa", location: "New York City" },
      { name: "Jacek", location: "Hamburg" },
    ])
  } else {
    const { name, location } = req.body;

    res.send({ status: "User Created", name, location });
  }
}