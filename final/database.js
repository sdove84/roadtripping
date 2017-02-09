
function get_value_database(){
    $.ajax({
        url: 'http://localhost/final/backend/data_from_frontend.php',
        type: "POST",
        data: ({
            origin: origin,
            destination:destination
        }),
        success: function(result){
           console.log(result);
        }
    });
}