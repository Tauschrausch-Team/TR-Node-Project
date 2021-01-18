// muss in app.js eingefügt werden

function database_query(sql_request) {         // Abfrage der Datenbank
    connection.query(sql_request, function (err, result) {
        if (err) {
            console.log("Result: " + result);
        }
    });    
}

//app.get("/katalog", function (req, res) {
//    res.render("katalog", {
//        title: "Katalogseite",
//        sql_request: value
//    });

//    templatingModule.data.templateVariable();
//});
