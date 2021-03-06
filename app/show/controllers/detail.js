
var async = require("async");
var articleDao = require("./../../../dao/article");
var forumDao = require("./../../../dao/forum");
var controller = {};

/**
 * 文章详情
 * @param req
 * @param res
 */
controller.detail = function(req,res) {
    var articleId = req.query.articleId;
    if(articleId) {

        async.series({
                pageData:function(callback) {
                    articleDao.getArticleAndUpdateReadCount(articleId,function(err,result) {
                        if(err) callback(err,null);
                        else callback(null,result);
                    });
                },
                prevNext:function(callback) {
                    articleDao.getArticleFields({_id:1},function(err,result) {
                        if(err) callback(err,null);
                        else {
                            console.log(result.length);
                            var data = {};
                            for(var index in result) {
                                console.log(typeof index);
                               if(articleId == result[index]._id) {
                                   var tempIndex = parseInt(index);
                                   data.prev = index > 0 ? result[tempIndex-1]._id : null;
                                   data.next = index != (result.length -1) ? result[tempIndex+1]._id : null;
                                   break;
                               }
                            }
                            callback(null,data);
                        }
                    });
                }
            }
            ,function(err,results) {
                if(!err) res.render("detail",results);
            });
    }
}


/**
 * 根据文章id获取模块
 * @param req
 * @param res
 */
controller.getForumByArticleId = function(req,res) {
    var articleId = req.body.articleId;
    if(articleId) {
        async.waterfall([
            function(callback){
                articleDao.base.getById(articleId,function(err,data) {
                    callback(err, data);
                });
            },
            function(arg, callback){
                if(arg) {
                    forumDao.base.getById(arg.forumId,function(err,data) {
                        callback(err, data);
                    });
                }
            }
        ], function (err, result) {
            if(!err) res.send(result);
        });
    }
}


module.exports = controller;
