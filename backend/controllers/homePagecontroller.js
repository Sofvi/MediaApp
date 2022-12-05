const { getRandPosts } = require("../model/homePageModel");

const getRandomPosts = async (req, res) => {
  const homePage = await getRandPosts(req, res);
  if (homePage) {
    res.json(homePage);
  } else {
    res.status(404).send("Errorr!!");
  }
};

module.exports = {
  getRandomPosts,
};
