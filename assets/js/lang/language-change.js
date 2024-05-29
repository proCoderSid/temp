function changeLanguage(data) {
  var isEng = true;
  var language = data || 'English';

  if (language !== 'English') {
    isEng = false;
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.async = true;
    script.src = 'assets/js/lang/' + language + '.js';
    script.type = 'text/javascript';
    head.appendChild(script);
  } else {
    isEng = true;
    var head = document.getElementsByTagName('head')[0];

    var script = document.createElement('script');
    script.async = true;
    script.src = 'assets/js/lang/' + language + '.js';
    script.type = 'text/javascript';
    head.appendChild(script);
  }
}

jQuery('document').ready(function () {
  //For Gujarati Unicode Typing in all input type text/textarea etc...
  jQuery('body').on('keypress', '.input_language, .select2-search__field', function (event) {
    // Number Return English Digit Value (Vishal)
    //if (event.keyCode >= 48 && event.keyCode <= 57){
    //    return true;
    //}
    if (language == 'English') {
      isEng = true;
      return true;
    } else {
      return change(this, event);
    }
  });
  jQuery('body').on('focus', '.input_language, .select2-search__field', function () {
    changeCursor(this);
  });
  jQuery('body').on('click', '.input_language, .select2-search__field', function () {
    changeCursor(this);
  });
  jQuery('body').on('keyup', '.input_language, .select2-search__field', function () {
    changeCursor(this);
  });
  jQuery('body').on('keydown', '.input_language, .select2-search__field', function (event) {
    positionChange(event);
  });
});

// convert gujarati/unicode numberic numbers to english numbers if possible , or return string as it is..
var uni2eng = function (num) {
  //num is string,

  var flag = true;
  var result = '';
  for (i = 0; i < num.length; i++) {
    /*if(gujarati.indexOf(num.charCodeAt(i))) {
     result = "" + result + gujarati.indexOf(num.charCodeAt(i))
     }*/
    if (num.charCodeAt(i) >= 2790 && num.charCodeAt(i) <= 2799) {
      result = '' + result + (num.charCodeAt(i) - 2790);
    } else if (num.charCodeAt(i) >= 2406 && num.charCodeAt(i) <= 2415) {
      result = '' + result + (num.charCodeAt(i) - 2406);
    } else {
      flag = false;
    }
  }
  if (flag) {
    return result;
  } else {
    return num;
  }
};
