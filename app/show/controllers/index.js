/**
 * Created by Administrator on 2016-01-28.
 */

var articleDao = require("./../../../dao/article");
var forumDao = require("./../../../dao/forum");
var async = require("async");
var controller = {};

/**
 * 首页
 * @param req
 * @param res
 */
controller.index = function(req,res) {
    async.series({
        indexArticles: function(callback){
            articleDao.getArticles(10,function(err,items) {
                if(err) callback(err,null);
                else callback(null,items);
            });
        },
        hotArticles: function(callback){    //热门文章
            articleDao.getHotArticles(function(err,items) {
                if(err) callback(err,null);
                else callback(null,items);
            });
        },
        newArticles: function(callback){
            articleDao.getNewArticles(function(err,items) {
                if(err) callback(err,null);
                else callback(null,items);
            });
        },
        tags: function(callback){   //tag标签
            articleDao.getTagArticles(function(err,items) {
                if(err) {
                    callback(err, null);
                } else {
                    var distint = {};
                    items.forEach(function(item) {
                        item.tag.forEach(function(it) {
                            distint[it] = it;
                        })
                    })
                    var result = [];
                    for(var key in distint) {
                        result.push(key);
                    }
                    callback(null,result);
                }
            })
        }
    },function(err, results) {
        if(!err){
            res.render("index",{pageData:results});
        }
    });
}


/**
 * 导航内容
 * @param req
 * @param res
 */
controller.header = function(req,res) {
    forumDao.base.getListByQuery({enabled:true},function(err,result) {
        res.send(err==null?result:"error");
    });
}


/**
 * 统计
 * @param req
 * @param res
 */
controller.statistics = function(req,res) {
    var userDao = require("./../../../dao/user");
    var commentDao = require("./../../../dao/comment");

    async.series({
        article:function(callback) {
            articleDao.getArticleFields({_id:0,readCount:1,tag:1},function(err,result) {
                if(err) callback(err,null);
                else {
                    var obj = {tagCount:0,articleCount:result.length,readCount:0};
                    result.forEach(function(item) {
                        if(item.tag && item.tag.length>0) {
                            obj.tagCount += item.tag.length;
                        }
                        obj.readCount += item.readCount;
                    });
                    callback(err,obj);
                }
            });
        },
        commentCount:function(callback) {
            commentDao.getCommentCount(function(err,result) {
                callback(err,result);
            })
        },
        userCount:function(callback) {
            userDao.getUserCount(function(err,result) {
                callback(err,result);
            })
        }
    },function(err,results) {
        res.send(results);
    });
}


module.exports = controller;
