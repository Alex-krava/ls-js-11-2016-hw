(function() {
    var accordeon = document.getElementsByClassName('accordeon_items')[0];
    accordeon.addEventListener('click', function(e) {
        e.preventDefault();
        var obj = e.target,
            objParent = obj.parentNode.parentNode;
        if (hasClass(obj, 'accordeon_link')) {
            if (hasClass(objParent, 'accordeon_item--active')) {
                removeClass(objParent, 'accordeon_item--active');
            } else {
                for (var i = 0; i < document.getElementsByClassName('accordeon_item--active').length; i++) {
                    removeClass(document.getElementsByClassName('accordeon_item--active')[i], 'accordeon_item--active');
                }
                addClass(objParent, 'accordeon_item--active');
            }
        }

        function hasClass(element, className) {
            var rx = new RegExp('(?:^| )' + className + '(?: |$)');
            return rx.test(element.className);
        }

        function addClass(o, c) {
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
            if (re.test(o.className)) return
            o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
        }

        function removeClass(o, c) {
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
            o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
        }
    })
})();