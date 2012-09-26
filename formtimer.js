
(function() {
  var formTimes = {};
  var timerSent = false;

  var initFormTimer = function(){

    $forms = $('form');

    $forms.children(':input').on('focus', function(e){
      var formId = $(e.target).closest('form').attr('id');
      if (typeof formId !== 'undefined' && typeof formTimes[formId] === 'undefined') {
        formTimes[formId] = {formId: formId, startTime: new Date()};
      }
    });

    $forms.on('submit', function(e){
      if (timerSent) return true;
      var formId = $(e.target).attr('id');
      if (typeof formId === 'undefined') return true;

      if (typeof formTimes[formId] !== 'undefined') {
        e.preventDefault();
        formTimes[formId].endTime = new Date();
        formTimes[formId].duration = formTimes[formId].endTime.getTime() - formTimes[formId].startTime.getTime();

        timerSent = true;
        //would ideally use a standard POST and rely on CORS, but trying to place nice with ye olde browsers
        $.getJSON('/create', formTimes[formId]).complete(function(){
          $(e.target).submit();
        });
        return false;
      } else {
        return true;
      }
    });
  };


  if (window.jQuery) {
    initFormTimer();
  } else {

    window.onload = function() {
      if(window.jQuery) {
        initFormTimer();
      }
    };

    document.write('<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"><\/script>');

  }

})();