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

            url: 'http://api.wunderground.com/your_key/forecast/geolookup/conditions/q/CA/San_Diego.json',
            success: function(result) {
                console.log('AJAX Success function called, with the following result:', result);

            }
        });
        console.log('End of click function');
    });
});