

$(document).ready(function() {
    $('#actionSubmit').click(function(){
        checkForCheckedValues();
    });

});

var checkedBoxes=[];

function checkForCheckedValues(){
    $("input[type=checkbox]:checked").each(function() {
        checkedBoxes.push($(this).val() );
    });
    console.log("users picks to have displayed:" +" "+checkedBoxes);
}

