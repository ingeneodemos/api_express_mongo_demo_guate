var express=require("express");
var router = express.Router();

router.get("/", function(req, res){
    const q = req.Client.find({}).limit(10)
    q.exec(function(err, docs){
        if(err){
            global.utils.sendError(res, err, "error al consultar los clientes");
        }else{
            res.json(docs)
        }
    })
});

router.get("/:id", function(req, res){
    req.Client.findById(req.params.id,function(err, docs){
        if(err){
            global.utils.sendError(res, err, "error al consultar el cliente");
        }else{
            if(!docs)
                global.utils.sendError(res, err, "No existe el cliente");
            else
                res.json(docs)
        }
    })
});

router.post("/", function(req, res){
    const msgValidation = global.utils.validateArgs(req.body.identity, global.msg.identity_required,req.body.name, global.msg.name_required,req.body.lastname, global.msg.lastname_required,req.body.email, global.msg.email_required,req.body.line, global.msg.line_required,req.body.balance, global.msg.balance_required)

    if(msgValidation){
        res.json(global.utils.error(msgValidation))
        return
    }

    var client = req.Client({identity:req.body.identity,name:req.body.name,lastname:req.body.lastname,email:req.body.email,line:req.body.line,balance:req.body.balance})
    client.save(function(err){
        if(err){
            global.utils.sendError(res, err, "error al registrar el documento");
        }else{
            log.info("guardado exitoso");
            res.json(global.utils.ok());
        }
    })
});

router.delete("/:id", function(req, res){
    req.Client.findByIdAndRemove(req.params.id, function(err){
        if(err){
            global.utils.sendError(res, err, "Error al eliminar cliente");
        }else{
            res.json(global.utils.ok())
        }
    })
})

router.put("/", function(req, res){
    const msgValidation = global.utils.validateArgs(req.body.identity, global.msg.identity_required,req.body.name, global.msg.name_required,req.body.lastname, global.msg.lastname_required,req.body.email, global.msg.email_required,req.body.line, global.msg.line_required,req.body.balance, global.msg.balance_required);
    if(msgValidation){
        res.json(global.utils.error(msgValidation));
        return;
    }

    req.Client.findById(req.body._id,function(err, client){
        if(err || !client){
            global.utils.sendError(res, err, "error al actualizar el cliente");
            return;
        }

        client.identity=req.body.identity || client.identity
        client.name=req.body.name || client.name
        client.lastname=req.body.lastname || client.lastname
        client.email=req.body.email || client.email
        client.line=req.body.line || client.line
        client.balance=req.body.balance || client.balance

        client.save(function(err){
            if(err){
                global.utils.sendError(res, err, "error al registrar el documento");
            }else{
                res.json(global.utils.ok())
            }
        })
    })
})

module.exports = router;