/*
dojo-mama: a JavaScript framework
Copyright (C) 2014 Omnibond Systems LLC

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
		'dojo-mama/Module',
		'app/crudExample/RootView'
], function(declare, Module, RootView) {
	return declare([Module], {
		'class':'crudExampleModule',
		postCreate: function() {
			this.inherited(arguments);
			var i, moduleName, modules = {};
			for (i=0; i < this.modules.length; ++i) {
				moduleName = this.modules[i];
				modules[moduleName] = {
					route: this.config.baseRoute + moduleName,
					label: this.config.modules[moduleName].title
				};
			}
			this.rootView = new RootView({
				route: '/',
				title: 'Crud Example',
				modules: modules
			});
			this.registerView(this.rootView);
		}
	});
});
