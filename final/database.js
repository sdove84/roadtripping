

function send_route_database(){
    console.log('save to data function clicked');
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



function send_places_database(){
  console.log('send places database');
    var sendData = {};
    sendData.acc_hotels=false;
    sendData.acc_motels=false;
    sendData.acc_camping=false;
    sendData.att_amusement=false;
    sendData.att_museums=false;
    sendData.att_zoo=false;
    sendData.out_beaches=false;
    sendData.out_trails=false;
    sendData.out_parks=false;
    sendData.gas_gas=false;
    sendData.gas_service=false;
    sendData.food_restaurant=false;
    sendData.food_diners=false;
    sendData.food_fastfood=false;
    sendData.food_vegetarian=false;
    sendData.food_bars=false;
    sendData.food_wineries=false;
    $("input[type=checkbox]:checked").each(function(index, ele) {
        console.log('ele:', ele, 'index:', index, 'value', $(ele).val());
        sendData[$(ele).attr('name')] = true;

    });
    console.log('here is object',sendData);
    // console.log('Data to send', sendData);
    return;
    $.ajax({
        url: 'http://localhost/final/backend/data_from_frontend.php',
        type: "POST",
        data: ({
            acc_hotels: acc_hotels,
            acc_motels:acc_motels,
            acc_camping:acc_camping

        }),
        success: function(result){
            console.log(result);
        }
    });

};















$(document).ready(function(){
   $('#save_routes_to_database').on('click',send_route_database);
    $('#save_places_to_database').on('click',send_places_database);
});

