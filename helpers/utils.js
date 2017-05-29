module.exports.getUrlApi=function(name){
    const url = config.apiName+config.apiVersion+"/"+name;
    log.info("service : "+url);
    return url;
}

module.exports.error=function(error){
    return {"success":false,error:error}
}

module.exports.ok=function(){
    return {"success":true}
}


module.exports.validateArgs=function(){
    for(var i=0;i<arguments.length;i+=2){
        if(arguments[i]==null)
            return arguments[i+1];
    }
    return null;
}

module.exports.validateArgsAndSend=function(){
    const res=arguments[0];
    for(var i=1;i<arguments.length;i+=2){
        if(arguments[i]==null){
            this.sendError(res, null, arguments[i+1]);
            return false;
        }
    }
    return true;
}

module.exports.sendError=function(res, err, msg){
    log.error(msg);
    log.error(err);
    res.status(global.msg.error_code);
    if(err)
        res.json(global.utils.error(err.message));
    else
        res.json(global.utils.error(msg));
}