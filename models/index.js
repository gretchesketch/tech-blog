// import models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

// Post belongsTo User
Post.belongsTo(User, {foreignKey: `user_id`});

// Comment belongsTo User
Comment.belongsTo(User, {foreignKey: `user_id`});

// Comment belongsTo post
Comment.belongsTo(Post, {foreignKey: `post_id`});

// User has many Posts
User.hasMany(Post, {foreignKey: `user_id`});

// User has many Comments
User.hasMany(Comment);

// Post has many comments
Post.hasMany(Comment);


module.exports = {
Post,
User,
Comment
};