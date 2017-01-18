/**
 * Created by Patrick on 1/17/2017.
 */
$(document).ready(function(){
    $('button').click(function(){
        console.log('click initiated');
        $.ajax({
            dataType: 'json',

            //needs key for 'Your_Key' and geolocation for 'query'
            //NOT TESTED YET!

            url: 'http://api.wunderground.com/api/Your_Key/alerts, conditions, forecast10day, geolookup, hourly/q/query.json',
            success: function(result) {
                console.log('AJAX Success function called, with the following result:', result);

            }
        });
        console.log('End of click function');
    });
});