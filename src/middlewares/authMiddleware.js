const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
                  
    //Verifica si el token existe y es valido.
    if(token){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.status(400)
                    .json(
                        { 
                            success: false,
                            message: ("Error! Token not valid " + err) 
                        })
            }else{
                console.log(decodedToken);
                next();
            }
        });

    }else{
        res.status(200)
            .json(
                {
                    success: false,
                    message: "Error! Token not provided."
                }
            );
    }
}

module.exports = { requireAuth }