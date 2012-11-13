# FormTimer

[Live Demo](http://formtimer.presidentialinnovationfellows.org/example)

## About

FormTimer times how long your forms take to fill out. Use it to make decisions based on real, live data, and to help complete burden estimates in compliance with the [Paperwork Reduction Act](http://www.archives.gov/federal-register/laws/paperwork-reduction/).

## Use With Google Analytics

FormTimer couldn't be easier to install if you're already using Google Analytics. The following will initialize FormTimer for each form on the page.

```javascript
<script>
//// Google Analytics Snippet ////
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-XXXXXXX-X']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//// Initialize FormTimer ////
$(function(){
  $("form").formTimer();
})
</script>
```

FormTimer relies on jQuery, so if you don't already have it installed, add the following *before* FormTimer:

```javascript
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
```

#### Viewing Results

Just login to your [Google Analytics]() account and go to the `Content => Events` section.

## Use With Our Hosted Server

Great news! You're welcome to use our server to track your stats if you don't want to use Google Analytics or setup your own. Just change the initial FormTimer call to

```javascript
<script>
$(function(){
  $("form").formTimer({
    url: 'http://formtimer.presidentialinnovationfellows.org/create'
  })
})
</script>
```

Don't forget that you'll need to include jQuery above the FormTimer script.

#### Viewing Results

You can access the results of your forms by specifying the URL to your webpage and the name of the form:

http://formtimer.presidentialinnovationfellows.org/results?url=mysite.com/somepage&formId=form_name

Add `.json` for a JSON representation of the results:

http://formtimer.presidentialinnovationfellows.org/results.json?url=mysite.com/somepage&formId=form_name

And for a JSON representation of the *stats*:

http://formtimer.presidentialinnovationfellows.org/stats.json?url=mysite.com/somepage&formId=form_name

## Customizing the Results

By default, we determine the name of a form by either its `id`, `name`, or `action` attribute, in order of preference. To name your form manually, you can add a `data-formtimer-name` attribute to the `<form>` tag.