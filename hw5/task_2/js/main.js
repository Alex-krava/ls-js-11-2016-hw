(function () {
    let elem = document.getElementById('button');

    elem.addEventListener('click', init);

    function init() {
        elem.style.display = 'none';
        addElement();
    }

    function addElement() {
        let body = document.querySelector('body');

        let screenWidth = screen.width;
        let screenHeight = screen.height;

        let maxWidth = 500;
        let maxHeight = 500;
        let size = colorSizeElement(maxWidth, maxHeight);

        let widthElem = size.width;
        let heightElem = size.height;
        let colorElem = size.color;

        let max = screenWidth - widthElem,
            min = 0;
        let leftPosition = Math.floor(Math.random() * (max - min + 1) + min);

        max = screenHeight - heightElem;
        min = 0;
        let topPosition = Math.floor(Math.random() * (max - min + 1) + min);

        let addElem = document.createElement('div');
        addElem.className = 'drag-elem';
        addElem.style.position = 'absolute';
        addElem.style.width = widthElem + 'px';
        addElem.style.height = heightElem + 'px';
        addElem.style.backgroundColor = colorElem;
        addElem.style.top = topPosition + 'px';
        addElem.style.left = leftPosition + 'px';

        body.appendChild(addElem);
        dragAndDrop();
    }

    function colorSizeElement(maxWidth, maxHeight) {
        let max = maxWidth,
            min = 1;
        let widthElem = Math.floor(Math.random() * (max - min + 1) + min);

        max = maxHeight;
        min = 1;
        let heightElem = Math.floor(Math.random() * (max - min + 1) + min);

        max = 255;
        min = 0;
        let r = Math.floor(Math.random() * (max - min + 1) + min);
        let g = Math.floor(Math.random() * (max - min + 1) + min);
        let b = Math.floor(Math.random() * (max - min + 1) + min);
        let colorElem = `rgb(${r}, ${g}, ${b})`;

        let size = {
            'height': heightElem,
            'width': widthElem,
            'color': colorElem
        }

        return size;
    }

    function dragAndDrop() {
        let dragElem = document.getElementsByClassName('drag-elem')[0];

        dragElem.addEventListener('mousedown', function (e) {
            let container = dragElem.getBoundingClientRect();

            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

            let clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
            let clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

            let top = container.top + scrollTop - clientTop;
            let left = container.left + scrollLeft - clientLeft;;

            let coords = {
                'top': Math.round(top),
                'left': Math.round(left)
            };

            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;

            positionElem(e);

            document.addEventListener('mousemove', events);
            dragElem.addEventListener('mouseup', events);

            function events(e){
                if(e.type === 'mousemove'){
                    positionElem(e);
                }
                if(e.type === 'mouseup'){
                    document.removeEventListener('mousemove', events);
                    dragElem.removeEventListener('mouseup', events);
                }
            }

            function positionElem(e) {
                dragElem.style.left = e.pageX - shiftX + 'px';
                dragElem.style.top = e.pageY - shiftY + 'px';
            }
        });
    }
})();