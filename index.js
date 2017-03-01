/**
 * @license The MIT License (MIT)
 * @copyright Boris Aleynikov <aleynikov.boris@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var List = require('mag-component-list'),
    CheckBox = require('spa-component-checkbox');


/**
 * Base check list implementation
 *
 * @constructor
 * @extends List
 *
 * @param {Object} [config={}] init parameters (all inherited from the parent)
 */
function CheckList ( config ) {
    var self = this;
    //config.className = 'checkList ' + (config.className || '');

    List.call(this, config);

    this.addListener('click:item', function ( event ) {
        var item = event.$item;

        item.checkBox.set(!item.checkBox.value);
        item.state = item.checkBox.value;
        self.data[item.index].state = item.checkBox.value;
    });

}


CheckList.prototype = Object.create(List.prototype);
CheckList.prototype.constructor = CheckList;

// set component name
CheckList.prototype.name = 'mag-component-check-list';

/**
 * Default render function
 *
 * @param {Element} $item in list
 * @param {array} data to render layout element
 * @param {string} [data.title] title of checkbox
 * @param {boolean} [data.state] state of checkbox: checked or not
 * @param {string} [data.value] special value of item
 */
CheckList.prototype.renderItemDefault = function ( $item, data ) {
    var table = document.createElement('table'),
        tr = document.createElement('tr'),
        td = document.createElement('td'),
        check = new CheckBox({
            value: data.state || false
        });

    $item.innerHTML = '';
    $item.className = 'item ' + (data.className || '') + ($item === this.$focusItem ? ' focus' : '');

    table.appendChild(tr);

    td.appendChild(check.$node);
    td.className = 'checkBoxWrapper';
    tr.appendChild(td);

    td = document.createElement('td');
    td.className = 'title';
    td.innerText = data.title || '';
    tr.appendChild(td);

    $item.checkBox = check;

    $item.state = check.value;
    $item.value = data.value;

    $item.appendChild(table);
};

CheckList.prototype.renderItem = CheckList.prototype.renderItemDefault;


module.exports = CheckList;

