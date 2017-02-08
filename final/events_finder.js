var result;
var startDate;
var endDate;
var myDateRange;
var cityEvent = null;
var eventAddress = null;
var eventTitle = null;


function getInformation(choice,cityForEvent) {

    console.log('call get info at event_finder.js');
    $.ajax({
        data: {
            app_key: "9QPc4kCRH3JtNMsD"
        },

        dataType: 'jsonp',
        method: "get",
               // url: 'http://api.eventful.com/json/events/search?...&keywords=Las Vegas, NV, United States&date=2017020500-2017021500&app_key=9QPc4kCRH3JtNMsD',
        url: 'http://api.eventful.com/json/events/search?...&keywords='+choice+'&location='+cityForEvent+'&date=2017020400-2017071500&app_key=9QPc4kCRH3JtNMsD',

        success: function (result) {

            console.log('here is the result ',result);
            if (result.events === null) {
                alert("No Events found");
            } else {
                for (var i = result.events.event.length-1; i >=0 ; i--) {
                    // cityEvent = result.events.event[i].city_name;
                    // eventAddress = result.events.event[i].venue_address;
                    // eventTitle = result.events.event[i].title;
                    var marker = create_event_marker(result.events.event[i]);
                    create_info_event(marker,result.events.event[i]);
                }
            }
        },
        error: function(){
            console.log('event finder not sucessful');
        }
    })
}

var cityForEvent = null;
var choice = null;

function getResults(){
    cityForEvent = $('#cityEvent').val();
    choice = $('input[name=choose]:checked').val();
    getInformation(choice,cityForEvent);
}

function set_val_destination(){
    $('#cityEvent').val(destination);
    console.log('des',destination);
}

