/**
 * @license The MIT License (MIT)
 * @copyright Boris Aleynikov <aleynikov.boris@gmail.com>
 */

'use strict';

var List = require('mag-component-list'),
    keys      = require('stb-keys'),
    ICON = 'theme-icon theme-icon-checkbox',
    ICON_ACTIVE = 'theme-icon theme-icon-checkbox-active';


/**
 * Base check list implementation
 *
 * @constructor
 * @extends List
 *
 * @param {Object} [config={}] init parameters (all inherited from the parent)
 */
function CheckList ( config ) {
    List.call(this, config);

    /**
     * Checked data array
     */
    this.checkedData = [];
}


CheckList.prototype = Object.create(List.prototype);
CheckList.prototype.constructor = CheckList;

// set component name
CheckList.prototype.name = 'mag-component-check-list';

/**
 * Set data and render inner structures and HTML.
 *
 * @param {Object} config init parameters (subset of constructor config params)
 */
CheckList.prototype.setData = function ( config ) {
    var i = 0;

    List.prototype.setData.call(this, config);

    for ( i; i < this.data.length; i++ ) {
        if ( this.data[i].state ) {
            this.checkedData.push(this.data[i]);
        }
    }
};


/**
 * CheckList of all default event callbacks.
 *
 * @type {Object.<string, function>}
 */
CheckList.prototype.defaultEvents = {
    /**
     * Default method to handle mouse wheel events.
     *
     * @param {Event} event generated event
     */
    mousewheel: function ( event ) {
        // scrolling by Y axis
        if ( this.type === this.TYPE_VERTICAL && event.wheelDeltaY ) {
            this.move(event.wheelDeltaY > 0 ? keys.up : keys.down);
        }

        // scrolling by X axis
        if ( this.type === this.TYPE_HORIZONTAL && event.wheelDeltaX ) {
            this.move(event.wheelDeltaX > 0 ? keys.left : keys.right);
        }
    },

    /**
     * Default method to handle keyboard keydown events.
     *
     * @param {Object} event generated event
     */
    keydown: function ( event ) {
        switch ( event.code ) {
            case keys.up:
            case keys.down:
            case keys.right:
            case keys.left:
            case keys.pageUp:
            case keys.pageDown:
            case keys.home:
            case keys.end:
                event.stop = true;
                // cursor move only on arrow keys
                this.move(event.code);
                break;
            case keys.enter:
                this.changeState(this.$focusItem);
                // there are some listeners
                if ( this.events['click:item'] && this.$focusItem ) {
                    // notify listeners
                    this.emit('click:item', {$item: this.$focusItem, event: event});
                }
                break;
        }
    }
};


CheckList.prototype.changeState = function ( item ) {
    var state = !item.state,
        data = this.data[item.index],
        index = -1;

    item.state = state;
    data.state = state;
    item.checkBox.className = state ? ICON_ACTIVE : ICON;

    if ( state ) {
        this.checkedData.push(data);
    } else {
        index = this.checkedData.indexOf(data);
        if ( index !== -1 ) {
            this.checkedData.slice(index, 1);
        }
    }

    if ( this.events['change:item'] ) {
        // notify listeners
        this.emit('change:item', {$item: item, state: state});
    }
};

/**
 * Default render function
 *
 * @param {Element} $item in list
 * @param {Array} data to render layout element
 * @param {string} [data.title] title of checkbox
 * @param {boolean} [data.state] state of checkbox: checked or not
 * @param {string} [data.value] special value of item
 */
CheckList.prototype.renderItemDefault = function ( $item, data ) {
    var table, tr, td,
        check;

    if ( $item.ready ) {
        $item.$title.innerText = data.title || '';
        $item.checkBox.className = data.state ? ICON_ACTIVE : ICON;

        $item.state = data.state;
        $item.value = data.value;

    } else {
        $item.innerHTML = '';
        table = document.createElement('table');
        tr = document.createElement('tr');
        td = document.createElement('td');
        check = document.createElement('div');
        check.className = data.state ? ICON_ACTIVE : ICON;

        table.appendChild(tr);
        td.appendChild(check);

        td.className = 'checkBoxWrapper';
        tr.appendChild(td);

        td = document.createElement('td');
        td.className = 'title';
        td.innerText = data.title || '';
        tr.appendChild(td);

        $item.checkBox = check;
        $item.state = data.state;
        $item.value = data.value;
        $item.$title = td;

        $item.appendChild(table);

        $item.ready = true;
    }
};

CheckList.prototype.renderItem = CheckList.prototype.renderItemDefault;


// public
module.exports = CheckList;