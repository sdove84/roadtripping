var output;
var startDate;
var endDate;
var myDateRange;

function getInformation() {

    console.log('call get info at event_finder.js');
    $.ajax({
        data: {
            app_key: "9QPc4kCRH3JtNMsD"
        },

        dataType: 'jsonp',
        method: "get",
               url: 'http://api.eventful.com/json/events/search?...&keywords=comedy&location=california&date=2017020500-2017021500&app_key=9QPc4kCRH3JtNMsD',
//         url: 'http://api.eventful.com/json/events/search?...&keywords='+choice+'&location='+cityForEvent+'&date='+myDateRange+'&app_key=9QPc4kCRH3JtNMsD',

        success: function (result) {
            output = result;
            console.log('here is the result ',output);

            //returns message if no results found
            if (result.events === null) {
                $('#display').append('no results found');
            } else {
                //loop for results including condition for fewer than 10 events(max)
                for (var i = 0; i < result.events.event.length; i++) {
                    //console.log("city name:" + result.events.event[i].city_name);
                    //console.log("description:" + result.events.event[i].description);
                    //console.log("time:" + result.events.event[i].start_time);
                    //console.log("title:" + result.events.event[i].title);

                    //displays results on page


                    var lat = result.events.event[i].latitude;
                    var lng = result.events.event[i].longitude;
                    lat = parseInt(lat);
                    lng = parseInt(lng);

                    console.log('here is lat and lng',lat +''+lng);


                    create_event_marker(result.events.event[i],lat,lng);

                    // $('#display').append(
                    //     (i+1) + ")  ",
                    //     "City: " + result.events.event[i].city_name, '<br>',
                    //     "Time: " + result.events.event[i].start_time, '<br>',
                    //     "Title: " + result.events.event[i].title, '<br>',
                    //     "Venue: " + result.events.event[i].venue_name, '<br>',
                    //     "Address: " + result.events.event[i].venue_address, '<br>',
                    //     "Latitude: " + result.events.event[i].latitude, '<br>',
                    //     "Longitude: " + result.events.event[i].longitude, '<br>',
                    //     "Description: " + result.events.event[i].description, '<br><br>');
                }
            }
        }

    })
}
