const http = require('http')
const port=8006

const server =http.createServer(function(req,res){
    res.write('Hello Node')
    res.end()
})

server.listen(port,function(error){
    if(error){
        console.log('Error has occured: ',error)
    }
    else{
        console.log('Server is listening on port ' + port)
    }

})
async () => {
    server.close();
  }