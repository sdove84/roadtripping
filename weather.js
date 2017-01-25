/**
 * Created by Patrick on 1/17/2017.
 */
//list of weather condition icons
http://icons.wxug.com/i/c/k/chanceflurries.gif
// http://icons.wxug.com/i/c/k/chancerain.gif
http://icons.wxug.com/i/c/k/chancesleet.gif
http://icons.wxug.com/i/c/k/chancesnow.gif
http://icons.wxug.com/i/c/k/chancetstorms.gif
http://icons.wxug.com/i/c/k/clear.gif
http://icons.wxug.com/i/c/k/cloudy.gif
http://icons.wxug.com/i/c/k/flurries.gif
http://icons.wxug.com/i/c/k/fog.gif
http://icons.wxug.com/i/c/k/hazy.gif
http://icons.wxug.com/i/c/k/mostlycloudy.gif
http://icons.wxug.com/i/c/k/mostlysunny.gif
http://icons.wxug.com/i/c/k/partlycloudy.gif
http://icons.wxug.com/i/c/k/partlysunny.gif
http://icons.wxug.com/i/c/k/sleet.gif
http://icons.wxug.com/i/c/k/rain.gif
http://icons.wxug.com/i/c/k/sleet.gif
http://icons.wxug.com/i/c/k/snow.gif
http://icons.wxug.com/i/c/k/sunny.gif
http://icons.wxug.com/i/c/k/tstorms.gif
http://icons.wxug.com/i/c/k/cloudy.gif
http://icons.wxug.com/i/c/k/partlycloudy.gif

    var fs = require('fs'),
        sys = require('sys'),
        http = require('http'),
        url = require('url'),
        loadFile = 'loadImage'
downloadFolder = 'loadedImages';

//open the file and read the contents
fs.readFile(loadFile,{
    encoding:'utf8'
} ,function(err,data) {
    if(err) {
        throw err;
    }
    //seperate the data on "\n" (new line on unix)
    var lines = data.split("\n");
    lines.forEach(function(item) {
        loadImage(item);
    });

});


var loadImage  = function(urlData) {
    var hostInfo = url.parse(urlData);
    if(hostInfo.path === null) {
        console.log("error",urlData);
        return false;
    }
    var name = hostInfo.path.split('/');
    var options  = {
        host:hostInfo.host,
        path:hostInfo.path,
        port:80
    };
    console.log('Loading Image Url:',hostInfo.href);


    //load the image with wget or direct in nodejs ?
    http.get(options, function(res) {

        var imagedata = '';
        res.setEncoding('binary');
        res.on('error', function (err) {
            console.log(err);
            throw err;
        });
        res.on('data', function(chunk) {
            imagedata +=chunk;
        });

        res.on('end', function () {
            fs.writeFile( './' + downloadFolder + '/' +  name[name.length-1], imagedata, 'binary', function (err) {
                if(err) {
                    console.log("write file");
                    throw err;
                }
                sys.puts('file:' + name);
            });
        });
    });

};


// trend = result.current_observation.pressure_trend
    if (trend === "+") {
        return(arrow up)
    } else if (trend === "-") {
        return(arrow down)
    } else {
        return("steady")
    }