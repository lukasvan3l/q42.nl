Meteor.autosubscribe(function() {
  Meteor.subscribe("blogpostIndex", Session.get("blogpage"), Session.get("blogtag"));
});
Meteor.autosubscribe(function() {
  Meteor.subscribe("blogpostFull", Session.get("blogpostid"));
});
Meteor.autosubscribe(function() {
  Meteor.subscribe("pagesByTag", Session.get("blogtag") || "");
});
var Posts = new Meteor.Collection("Posts");
var PageCounts = new Meteor.Collection("PageCounts");

Template.blog.postGroup = function() {
  var posts = Posts.find().fetch();
  var postGroups = [];
  while (posts.length)
    postGroups.push(posts.splice(0, 3));
  return postGroups;
}
Template.blog.pagination = function() {
  var item = PageCounts.findOne({ tag: Session.get("blogtag") || "" });
  var pages = item ? item.count : 1;
  var items = [];
  var page = Session.get("blogpage") || 1;
  if (page > 1)
    items.push({ label: "nieuwer", page: page - 1 })
  var min = Math.max(1, page - 3);
  var max = Math.min(pages, page + 3);
  for (var i = min; i <= max; i++)
    items.push({ label: i, page: i, active: i == page });
  if (page < pages)
    items.push({ label: "ouder", page: page + 1 })
  return items;
}
Template.blog.tag = function() {
  return Session.get("blogtag");
}
Template.blog.debug = function(obj) {
  return "<!--" + JSON.stringify(obj) + "-->"
}
Template.blogpost.post = function() {
  return Posts.findOne({ id: Session.get("blogpostid") });
}