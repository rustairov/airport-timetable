Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString()
        , mm = (this.getMonth()+1).toString()
        , dd  = this.getDate().toString()
        ;
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};

$(function() {

    var getTable = function(type) {
        var date = new Date();

	    $('#table').html('<div class="text-center"><i class="fa fa-refresh fa-5x fa-spin"></i></div>');

        $.get(window.location.pathname + '/' + type, {
            date: date.yyyymmdd()
        }, function(data, textStatus, jqXHR) {
            $('#table').html(data);
        });
    };

    getTable('dep');

    /*
    $('input[name="type"]').bootstrapSwitch({
        onText: '<i class="fa fa-plane"></i>',
        offText: '<i class="fa fa-plane fa-flip-vertical"></i>'
    });
    */

    $('input[type="radio"]').change(function() {
        if ($(this).val() === 'dep') {
            getTable('dep');
        } else {
            getTable('arr');
        }
    });

});
