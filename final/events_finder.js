var output;
var startDate;
var endDate;
var myDateRange;

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
            output = result;
            console.log('here is the result ',output);
            //returns message if no results found
            if (result.events === null) {
                $('#display').append('no results found');
            } else {
                //loop for results including condition for fewer than 10 events(max)
                for (var i = 0; i < result.events.event.length; i++) {
                    var lat = result.events.event[i].latitude;
                    var lng = result.events.event[i].longitude;
                    lat = parseInt(lat);
                    lng = parseInt(lng);
                    console.log('here is lat and lng',lat +''+lng);
                    create_event_marker(result.events.event[i],lat,lng);
                }
            }
        }
    })
}

var cityForEvent = null;
var choice = null;

function getResults(){
    cityForEvent = $('#cityEvent').val();
    choice = (document.querySelector('input[name="choose"]:checked').value);
    console.log('User has typed: ' + choice);
    // startDate = $('#start').val();
    // endDate = $('#end').val();
    // myDateRange= (startDate + '00-' + endDate + '00');
    // console.log(myDateRange);
    getInformation(choice,cityForEvent);
}
