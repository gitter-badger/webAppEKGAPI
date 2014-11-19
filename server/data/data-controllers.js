// Connect to the Microsoft SQL Server instance on Azure VM
var mssql = require('mssql');
var config = {
  user: 'ekgwebapp',
  password: 'ekgsqlserver1MSSS',
  server: '104.40.3.154',
  database: 'master',
  options: {
    encrypt: true
  }
};

module.exports = {

  getData: function(req, res, next){
    // The time property in the request body should be an object 
    // that contains three properties: 
    //     1) day of week (0-6, Sunday-Monday)
    //     2) hour (0-23)
    //     3) minute (0-59)
    var requestedTime = req.body.time;
/*    
    var year = (new Date()).getFullYear();
    var month = (new Date()).getMonth();
    var utc = Date.UTC(year, month, requestedTime.date, requestedTime.hour, requestedTime.minute);*/

    // The time property in the request body should be a number
    // that indicates the number of ms since the start of the graph
    var startTime = req.body.time % 1000000; // We currently only have 1000000 ms of actual data

    /**************************************************************************/
    /* TODO: Get request with json data in certain range ( 1 minute )
    /**************************************************************************/

    // The username was put onto the request by the decode middleware
    var username = req.username;

    // Query database for the data from that user
    mssql.connect(config, function(err){
      // Passes any errors to the error handler
      if (err) next(new Error(err));

      var request = new mssql.Request();
      request.query('select * from SampleData.dbo.duplicatedSampleEKG1'
        + ' where x >= ' + startTime + ' and x < ' + parseInt(startTime) + 30000, 
        function(err, results){
        // Passes any errors to the error handler
        if (err) next(new Error('Error in first query' + err));
        res.json({
          results: results.map(function(item){
            return {
              x: item.x,
              y: item.y
            };
          }),
          indicators: results.map(function(item){
            return {
              x: item.x,
              y: item.maxIndicator
            };
          })
        });
      });

    });
  }

};
