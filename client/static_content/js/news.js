
$(function () {
 
       $(".news-demo-down-auto").bootstrapNews({
 
            newsPerPage: 3,
 
            autoplay: true,
 
            pauseOnHover: true,
 
            navigation: false,
 
            direction: 'down',
 
            newsTickerInterval: 1500,
 
            onToDo: function () {
 
            }
 
        });
 
    });

/*
 * jQuery Bootstrap News Box v1.0.1
 *
 * Copyright 2014, Dragan Mitrovic
 * email: gagi270683@gmail.com
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
if (typeof Object.create !== "function") {
    Object.create = function(e) {
        function t() {}
        t.prototype = e;
        return new t
    }
}(function(e, t, n, r) {
    var i = {
        init: function(t, n) {
            var r = this;
            r.elem = n;
            r.$elem = e(n);
            r.newsTagName = r.$elem.find(":first-child").prop("tagName");
            r.newsClassName = r.$elem.find(":first-child").attr("class");
            r.timer = null;
            r.resizeTimer = null;
            r.animationStarted = false;
            r.isHovered = false;
            if (typeof t === "string") {
                if (console) {
                    console.error("String property override is not supported")
                }
                throw "String property override is not supported"
            } else {
                r.options = e.extend({}, e.fn.bootstrapNews.options, t);
                r.prepareLayout();
                if (r.options.autoplay) {
                    r.animate()
                }
                if (r.options.navigation) {
                    r.buildNavigation()
                }
                if (typeof r.options.onToDo === "function") {
                    r.options.onToDo.apply(r, arguments)
                }
            }
        },
        prepareLayout: function() {
            var n = this;
            e(n.elem).find("." + n.newsClassName).on("mouseenter", function() {
                n.onReset(true)
            });
            e(n.elem).find("." + n.newsClassName).on("mouseout", function() {
                n.onReset(false)
            });
            e.map(n.$elem.find(n.newsTagName), function(t, r) {
                if (r > n.options.newsPerPage - 1) {
                    e(t).hide()
                } else {
                    e(t).show()
                }
            });
            if (n.$elem.find(n.newsTagName).length < n.options.newsPerPage) {
                n.options.newsPerPage = n.$elem.find(n.newsTagName).length
            }
            var r = 0;
            e.map(n.$elem.find(n.newsTagName), function(t, i) {
                if (i < n.options.newsPerPage) {
                    r = parseInt(r) + parseInt(e(t).height()) + 10
                }
            });
            e(n.elem).css({
                "overflow-y": "hidden",
                height: r
            });
            e(t).resize(function() {
                if (n.resizeTimer !== null) {
                    clearTimeout(n.resizeTimer)
                }
                n.resizeTimer = setTimeout(function() {
                    n.prepareLayout()
                }, 200)
            })
        },
        findPanelObject: function() {
            var e = this.$elem;
            while (e.parent() !== r) {
                e = e.parent();
                if (e.parent().hasClass("panel")) {
                    return e.parent()
                }
            }
            return r
        },
        buildNavigation: function() {
            var t = this.findPanelObject();
            if (t) {
                var n = '<ul class="pagination pull-right" style="margin: 0px;">' + '<li><a href="#" class="prev"><span class="glyphicon glyphicon-chevron-down"></span></a></li>' + '<li><a href="#" class="next"><span class="glyphicon glyphicon-chevron-up"></span></a></li>' + '</ul><div class="clearfix"></div>';
                var r = e(t).find(".panel-footer")[0];
                if (r) {
                    e(r).append(n)
                } else {
                    e(t).append('<div class="panel-footer">' + n + "</div>")
                }
                var i = this;
                e(t).find(".prev").on("click", function(e) {
                    e.preventDefault();
                    i.onPrev()
                });
                e(t).find(".next").on("click", function(e) {
                    e.preventDefault();
                    i.onNext()
                })
            }
        },
        onStop: function() {},
        onPause: function() {
            var e = this;
            e.isHovered = true;
            if (this.options.autoplay && e.timer) {
                clearTimeout(e.timer)
            }
        },
        onReset: function(e) {
            var t = this;
            if (t.timer) {
                clearTimeout(t.timer)
            }
            if (t.options.autoplay) {
                t.isHovered = e;
                t.animate()
            }
        },
        animate: function() {
            var e = this;
            e.timer = setTimeout(function() {
                if (!e.options.pauseOnHover) {
                    e.isHovered = false
                }
                if (!e.isHovered) {
                    if (e.options.direction === "up") {
                        e.onNext()
                    } else {
                        e.onPrev()
                    }
                }
            }, e.options.newsTickerInterval)
        },
        onPrev: function() {
            var t = this;
            if (t.animationStarted) {
                return false
            }
            t.animationStarted = true;
            var n = "<" + t.newsTagName + ' style="display:none;" class="' + t.newsClassName + '">' + e(t.$elem).find(t.newsTagName).last().html() + "</" + t.newsTagName + ">";
            e(t.$elem).prepend(n);
            e(t.$elem).find(t.newsTagName).first().slideDown(t.options.animationSpeed, function() {
                e(t.$elem).find(t.newsTagName).last().remove()
            });
            e(t.$elem).find(t.newsTagName + ":nth-child(" + parseInt(t.options.newsPerPage + 1) + ")").slideUp(t.options.animationSpeed, function() {
                t.animationStarted = false;
                t.onReset(t.isHovered)
            });
            e(t.elem).find("." + t.newsClassName).on("mouseenter", function() {
                t.onReset(true)
            });
            e(t.elem).find("." + t.newsClassName).on("mouseout", function() {
                t.onReset(false)
            })
        },
        onNext: function() {
            var t = this;
            if (t.animationStarted) {
                return false
            }
            t.animationStarted = true;
            var n = "<" + t.newsTagName + ' style="display:none;" class=' + t.newsClassName + ">" + e(t.$elem).find(t.newsTagName).first().html() + "</" + t.newsTagName + ">";
            e(t.$elem).append(n);
            e(t.$elem).find(t.newsTagName).first().slideUp(t.options.animationSpeed, function() {
                e(this).remove()
            });
            e(t.$elem).find(t.newsTagName + ":nth-child(" + parseInt(t.options.newsPerPage + 1) + ")").slideDown(t.options.animationSpeed, function() {
                t.animationStarted = false;
                t.onReset(t.isHovered)
            });
            e(t.elem).find("." + t.newsClassName).on("mouseenter", function() {
                t.onReset(true)
            });
            e(t.elem).find("." + t.newsClassName).on("mouseout", function() {
                t.onReset(false)
            })
        }
    };
    e.fn.bootstrapNews = function(e) {
        return this.each(function() {
            var t = Object.create(i);
            t.init(e, this)
        })
    };
    e.fn.bootstrapNews.options = {
        newsPerPage: 4,
        navigation: true,
        autoplay: true,
        direction: "up",
        animationSpeed: "normal",
        newsTickerInterval: 4e3,
        pauseOnHover: true,
        onStop: null,
        onPause: null,
        onReset: null,
        onPrev: null,
        onNext: null,
        onToDo: null
    }
})(jQuery, window, document)