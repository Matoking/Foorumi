var authentication = function(req, res, next){
  // Tarkista, että käyttäjä on kirjautunut tässä
  if (!("userId" in req.session) || req.session.userId === null) {
      res.sendStatus(403);
  } else {
      next();
  }
}

module.exports = authentication;
