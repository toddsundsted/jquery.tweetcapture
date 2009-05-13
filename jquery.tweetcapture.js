jQuery.fn.reverse = function() {
  return this.pushStack(this.get().reverse(), arguments);
};
jQuery.fn.tweetcapture = function(options) {
  var defaults = {
    url: "http://search.twitter.com/search.json?callback=?"
  };
  var opts = jQuery.extend(defaults, options);
  return this.each(function() {
    var elem = this;
    var title = jQuery(elem).attr("title");
    if (!title) {
      return;
    }
    var url = opts.url;
    var params = {q:title};
    var last_id = jQuery.data(elem, "last_id");
    if (last_id) {
      params["since_id"] = last_id;
    }
    jQuery.getJSON(url, params, function(json) {
      jQuery(json.results).reverse().each(function() {
        var created_at = new Date(Date.parse(this.created_at));
        var created_at_str = "<span class=\"created-at\">" + created_at.getHours() + ":" + ((min = created_at.getMinutes()) < 10 ? "0" + min : min) + "</span>";
        var profile_image_url_str = "<img src=\"" + this.profile_image_url + "\" width=\"50\" height=\"50\"/>";
        var from_user_str = "<span class=\"from-user\"><a target=\"_blank\" href=\"http://twitter.com/" + this.from_user + "\">" + this.from_user + "</a></span>";
        var text_str = "<span class=\"text\">" + this.text + "</span>";
        jQuery(elem).prepend("<div id=\"tweet" + this.id + "\" class=\"tweet\">" + profile_image_url_str + text_str + from_user_str + created_at_str + "</div>");
        jQuery("#tweet" + this.id).hide();
        jQuery("#tweet" + this.id + " img").hide();
        jQuery("#tweet" + this.id).slideDown(1000);
        jQuery("#tweet" + this.id + " img").fadeIn(4000);
        jQuery.data(elem, "last_id", this.id);
      });
    });
  });
};
