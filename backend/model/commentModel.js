const pool = require("../database/db-config");
const promisePool = pool.promise();

//get all comments
const getAllComments = async (res) => {
  try {
    const sql = "SELECT * FROM comment";
    const [rows] = await promisePool.query(sql);
    console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getComment = async (id, res) => {
  try {
    const sql = "SELECT * FROM comment WHERE post_id = ?"; //"SELECT * FROM posts WHERE id=" + id;
    const [rows] = await promisePool.query(sql, id);
    console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

//TODO
//*const getCommentByPost = async();

const addComment = async (comment, res) => {
  try {
    const { user_id, post_id, content } = comment;
    //console.log("user:", user);
    const sql = "INSERT INTO comment(user_id,post_id,content) VALUE (?, ?,?)";
    const values = [user_id, post_id, content];
    const [result] = await promisePool.query(sql, values);
    result;
    return result;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const editComment = async (comment, res) => {
  try {
    console.log("Modify comment:", comment);
    const { content, id } = comment;
    const sql =
      "UPDATE comment SET content = ?, edited_date = CURRENT_TIMESTAMP  WHERE id = ?  ";
    const values = [content, id];
    const [result] = await promisePool.execute(sql, values);
    console.log("Result", result);
    return result;
  } catch (e) {
    res.status(501).send(e.message);
  }
};

const deleteComment = async (id, res) => {
  try {
    let sql = "DELETE FROM comment where id = " + id;
    const [result] = await promisePool.execute(sql);
    console.log("Result: ", result);
    return result;
  } catch (e) {
    res.status(501).send(e.message);
  }
};

module.exports = {
  getAllComments,
  getComment,
  addComment,
  editComment,
  deleteComment,
};
