const db = require("../connection");



exports.fetchCommentsById = async (article_id) => {
    const comments = await db.query(
      `SELECT comments.author, comments.body, comments.comment_id,comments.created_at, comments.votes
      FROM comments 
      INNER JOIN articles 
      ON articles.article_id = comments.article_id
      WHERE comments.article_id = $1 ;`,
      [article_id]
    );
    return comments.rows;
  };

  exports.insertComment = async (newComment, article_id) => {
    const { username, body } = newComment;
  
    const comment = await db.query(
      `INSERT INTO comments (author,body,article_id) VALUES ($1,$2,$3) RETURNING *;`,
      [username, body, article_id]
    );
    return comment.rows[0];
  };
  