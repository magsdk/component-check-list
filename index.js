/**
 * @license The MIT License (MIT)
 * @copyright Boris Aleynikov <aleynikov.boris@gmail.com>
 */

'use strict';

var List         = require('mag-component-list'),
    keys         = require('stb-keys'),
    CLASS_ACTIVE = 'checked',
    ICON         = 'theme-icon theme-icon-checkbox',
    ICON_ACTIVE  = 'theme-icon theme-icon-checkbox-active';


/**
 * Base check list implementation
 *
 * @constructor
 * @extends List
 *
 * @param {Object} [config={}] init parameters (all inherited from the parent)
 */
function CheckList ( config ) {
    /**
     * Checked data array
     */
    this.checkedData = [];

    List.call(this, config);
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
    var index = 0;

    List.prototype.setData.call(this, config);
    this.checkedData = [];

    for ( index; index < this.data.length; index++ ) {
        this.data[index].defaultState = this.data[index].state;
        if ( this.data[index].state ) {
            this.checkedData.push(this.data[index]);
        }
    }

    if ( this.$focusItem ) {
        this.defaultFocusIndex = this.$focusItem.index;
    } else {
        this.defaultFocusIndex = 0;
    }
};


/**
 * Reset data to default state and render inner structures and HTML.
 */
CheckList.prototype.resetData = function () {
    var index = 0;

    for ( index; index < this.data.length; index++ ) {
        this.data[index].state = this.data[index].defaultState;
    }

    this.setData({data: this.data, focusIndex: this.defaultFocusIndex});
};


/**
 * Set all states to false and render inner structures and HTML.
 */
CheckList.prototype.clearChecked = function () {
    var index = 0;

    for ( index; index < this.data.length; index++ ) {
        this.data[index].state = false;
    }

    this.setData({data: this.data});
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
    mousewheel: List.prototype.defaultEvents.mousewheel,

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


CheckList.prototype.changeState = function ( $item ) {
    var state = !$item.state,
        data = this.data[$item.index],
        index = -1;

    $item.state = state;
    data.state = state;
    if ( state ) {
        $item.classList.add(CLASS_ACTIVE);
        $item.checkBox.className = ICON_ACTIVE;
    } else {
        $item.classList.remove(CLASS_ACTIVE);
        $item.checkBox.className = ICON;
    }

    if ( state ) {
        this.checkedData.push(data);
    } else {
        index = this.checkedData.indexOf(data);
        if ( index !== -1 ) {
            this.checkedData.splice(index, 1);
        }
    }

    if ( this.events['change:item'] ) {
        // notify listeners
        this.emit('change:item', {$item: $item, state: state});
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
        if ( data.state ) {
            $item.classList.add(CLASS_ACTIVE);
            $item.checkBox.className = ICON_ACTIVE;
        } else {
            $item.classList.remove(CLASS_ACTIVE);
            $item.checkBox.className = ICON;
        }

        $item.state = data.state;
        $item.value = data.value;
    } else {
        $item.innerHTML = '';
        table = document.createElement('table');
        tr = document.createElement('tr');
        td = document.createElement('td');
        check = document.createElement('div');
        if ( data.state ) {
            $item.classList.add(CLASS_ACTIVE);
            check.className = ICON_ACTIVE;
        } else {
            $item.classList.remove(CLASS_ACTIVE);
            check.className = ICON;
        }

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
