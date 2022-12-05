"use strict";
const pool = require("../database/db-config");
const promisePool = pool.promise();

const getRandPosts = async (res, req) => {
  try {
    const sql = "SELECT file, description FROM post ORDER BY RAND () LIMIT 10";
    const [result] = await promisePool.execute(sql);
    return result;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = { getRandPosts };
