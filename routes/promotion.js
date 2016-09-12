var express = require('express');
var bodyParser = require('body-parser');
var getRouter = function(static){
    
    var router = express.Router();
    router.use(bodyParser.json());
    
    router.route('/')
    
    .all(function(req,res,next){
        res.writeHead(200, {'Content-Type':'text/plain' });
        next()
    })
    
    .get(function(req,res,next){
        res.end("get all "+ static  +"");
    })
    
    .post(function(req,res,next){
        res.end('post new ' + static + '. Name: '+ req.body.name + ' description: ' + req.body.description);
    })
    
    .delete(function(req,res,next){
        res.end("delete all " + static);
    });
    
    router.route('/:id')
    
    .get(function(req,res,next){
        res.end("get " + static + "Id: " + req.params.id );
    })
    
    .delete(function(req,res,next){
        res.end("delete " + static + "Id: " + req.params.id );
    })
    
    .put(function(req,res,next){
        res.end("update " + static + "Id: " + req.params.id + ' name: ' + req.body.name + 'descriptions: ' + req.body.description );
    });
    return router;
}
var name =  __filename.split('/').pop().split('.')[0];
module.exports = getRouter(name); 
