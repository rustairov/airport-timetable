$(function() {

    var getTable = function(type) {
        var date = new Date();

	    $('#table').html('<div class="text-center"><i class="fa fa-refresh fa-5x fa-spin"></i></div>');
        $.get(window.location.pathname + '/' + type, function(data, textStatus, jqXHR) {
            $('#table').html(data);
	        $('.table-fixed-header').fixedHeader();
        });
    };

    getTable('dep');

    $('input[type="radio"]').change(function() {
        if ($(this).val() === 'dep') {
            getTable('dep');
        } else {
            getTable('arr');
        }
    });
});
