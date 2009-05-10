function runtests() {
  function testForTweets(elem) {
    var size = elem.find(".tweet").size();
    equals(size > 0, true, "We expect to find tweets");
  }
  function testForUniqueness(elem) {
    var size = elem.find(".tweet").size();
    var id_list = {};
    var unique = true;
    var count = 0;
    elem.find(".tweet[id]").each(function() {
      count++;
      if (id_list[$(this).attr("id")]) {
        unique = false;
      }
      id_list[$(this).attr("id")] = true;
    });
    equals(count, size, "We expect the tweets to have ids");
    equals(unique, true, "We expect the tweets to be unique");
  }
  function testForSorting(elem) {
    var size = elem.find(".tweet").size();
    var last_created_at = undefined;
    var sorted = true;
    var count = 0;
    elem.find(".tweet .created-at").each(function() {
      count++;
      var created_at = Date.parse($(this).html());
      if (last_created_at && created_at > last_created_at) {
        sorted = false;
      }
      last_created_at = created_at;
    });
    equals(count, size, "We expect the tweets to have datetimes");
    equals(sorted, true, "We expect the tweets to be sorted by datetime");
  }
  /* Find target divs; extract required and optional attributes (all are required for testing). */
  test("test find divs and extract attributes", function() {
    expect(6);
    $(".twitter").each(function() {
      ok($(this).attr("id"), "The id is optional.");
      ok($(this).attr("class"), "The class is optional.");
      ok($(this).attr("title"), "The title is required.");
    });
  });
  /* Tweetcapture target divs one time; verify tweetcaptured structure. */
  test("test tweetcapture divs one time and verify tweetcaptured structure", function() {
    $(".twitter").tweetcapture();
    stop();
    setTimeout(function() {
      expect(10);
      $(".twitter").each(function() {
        testForTweets($(this));
        testForUniqueness($(this));
        testForSorting($(this));
      });
      start();
    }, 1500);
  });
  /* Tweetcapture target divs a second time; verify tweetcaptured structure. */
  test("test tweetcapture divs a second time and verify tweetcaptured structure", function() {
    $(".twitter").tweetcapture();
    stop();
    setTimeout(function() {
      expect(10);
      $(".twitter").each(function() {
        testForTweets($(this));
        testForUniqueness($(this));
        testForSorting($(this));
      });
      start();
    }, 1500);
  });
}
