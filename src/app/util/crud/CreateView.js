/*
dojo-mama: a JavaScript framework
Copyright (C) 2015 Omnibond Systems, LLC

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/

define(['dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/dom-construct',
		'dojo/dom-class',
		'dojo/topic',
		'app/util/EdgeToEdgeList',
		'app/layout/layout',
		'app/layout/Module',
		'app/util/crud/EditView'
], function(declare, lang, domConstruct, domClass, topic, EdgeToEdgeList, layout, Module, EditView) {
	
	// module:
	//     app/util/crud/CreateView

	return declare([EditView], {
		// summary:
		//     A create view for CRUD data items

		// _itemType: Object
		//     The type of item being created
		_itemType: null,
		// route: String
		//     The dojo-mama route
		route: '/create/:type',
		// viewType: String
		//     The type of this view, used with nls resources (app/util/crud/TextMixin)
		viewType: 'Create',

		_handleData: function(/*String*/objectId,/*Object*/e,/*Object*/parser) {
			// summary:
			//     Catches the response of this.module.getData().
			// objectId: 
			//     The objectId of the item we're looking for.
			// e:
			//     The dojo/router event
			// parser:
			//     A data parser with the response data already loaded into it
			layout.stopProgress();
			var properties, item,
				itemType = e.params.type;
				
			// make sure the item type is createable
			this._itemType = itemType;
			
			var type = parser.getTypeById(itemType);

			if (!type) {
				layout.show404();
				return;
			}
			properties = type.getCreateProperties();

			if(!properties){
				throw "No create properties found.";
			}
			
			item = {
				data: {},
				properties: properties
			};
			this._item = parser._newItem(item);
			this.buildItemDetailList(this._item);
		},

		getSaveRequest: function(diff) {
			// summary:
			//     Returns the payload to save
			return {
				data: diff,
				properties: {
					type: this._itemType
				}
			};
					
		},


		_buildItemControls: function(/*Object*/item){
			// summary: 
			//     Builds out controls for interacting with the item being displayed
			// item:
			//     the item object
			
			var div = domConstruct.create('div', {
					'class': "buttonBar"
			}, this.content.domNode);
			
			domConstruct.create('a', {
				innerHTML: 'Save',
				onclick: lang.hitch(this, this.save),
				'class': 'button'
			}, div);

			domConstruct.create('a', {
				innerHTML: 'Cancel',
				'class': 'button',
				onclick: function(){
					window.history.back();
				}
			}, div);
		}

	});
});
