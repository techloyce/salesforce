    window.onload = setupPage;
    function setupPage() {
      //function contains all code to execute after page is rendered

      var state = { //state that you need when the callback is called
          output : document.getElementById("output"),
          startTime : new Date().getTime()};

      var callback = {
          //call layoutResult if the request is successful
          onSuccess: layoutResults,

          //call queryFailed if the api request fails
          onFailure: queryFailed,
          source: state};

      sforce.connection.query(
          "Select Id, Name, Industry From Account order by Industry",
           callback);
  }

  function queryFailed(error, source) {
    source.output.innerHTML = "An error has occurred: " + error;
  }

  /**
  * This method will be called when the toolkit receives a successful
  * response from the server.
  * @queryResult - result that server returned
  * @source - state passed into the query method call.
  */
  function layoutResults(queryResult, source) {
    if (queryResult.size > 0) {
      var output = "";

      //get the records array
      var records = queryResult.getArray('records');

      //loop through the records and construct html string
      for (var i = 0; i < records.length; i++) {
        var account = records[i];

        output += account.Id + " " + account.Name +
            " [Industry - " + account.Industry + "]<br>";
      }

    //render the generated html string
    source.output.innerHTML = output;
    }
  }