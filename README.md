# FormTimer

[Live Demo](http://formtimer.presidentialinnovationfellows.org/example)

## About

FormTimer times how long your forms take to fill out. Use it to make decisions based on real, live data, and to help complete burden estimates in compliance with the [Paperwork Reduction Act](http://www.archives.gov/federal-register/laws/paperwork-reduction/).

## Use With Google Analytics

FormTimer couldn't be easier to install. Just add this code right above the closing `</body>` tag. This will initialize FormTimer for each form on the page.

```
$("form").formTimer({
  ga-id: "UA-XXXXX-X"
})
```

Be sure to add your Google Analytics Property ID.

By default, we determine the name of a form by either its `id`, `name`, or `action` attribute, in order of preference.

To name your form manually, you can add a `data-formtimer-name` attribute to the `<form>` tag.

#### Viewing Results

Just login to your [Google Analytics]() account and go to the `Custom Variables` section.

## Use With Our Hosted Server

Great news! You're welcome to use our server to track your stats if you don't want to use Google Analytics or setup your own. Just change the initial FormTimer call to

```
$("form").formTimer({
  url: "http://formtimer.presidentialinnovationfellows.org"
})
```

#### Viewing Results

You can access the results of your forms by specifying the URL to your webpage and the name of the form:

`http://formtimer.presidentialinnovationfellows.org/results?url=mysite.com/somepage&form=form_name`

Add `.json` for a JSON representation of the results:

`http://formtimer.presidentialinnovationfellows.org/results.json?url=mysite.com/somepage&form=form_name`
