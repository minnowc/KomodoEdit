/**
 * @copyright (c) 2016 ActiveState Software Inc.
 * @license Mozilla Public License v. 2.0
 * @author NathanR, CareyH
 * @overview Row sub module for the ko/ui SDK
 *
 */

var parent = require("./element");
var Module = Object.assign({}, parent);
var $ = require("ko/dom");
module.exports = Module;

// Main module (module.exports)
(function() {
    
    this.Model = Object.assign({}, this.Model);
    
    (function() {
        
        this.name = "menu";
        this.menupopup = null;
        
        this.init = function(menuitems = [], options = {})
        {
            if ( ! Array.isArray(menuitems) && typeof menuitems == "object")
            {
                options = menuitems;
            }
            
            if ("menuitems" in options)
            {
                menuitems = options.menuitems;
            }
            
            this.options = options;
            this.$element = $($.create(this.name, options.attributes || {}).toString());
            this.element = this.$element.element();
            
            if (menuitems)
            {
                this.addMenuItems(menuitems);
            }
        };
        
        this.addMenuItems = function (menuitems)
        {
            for (let menuitem of menuitems) {
                this.addMenuItem(menuitem);
            }
        };
        
        this.addMenuItem = function (menuitem)
        {
            if ( ! this.menupopup)
            {
                this.menupopup = require("./menupopup").create();
                this.$element.append(this.menupopup.element);
            }
            
            var element;
            if ("isSdkElement" in menuitem)
            {
                element = menuitem.element;
            }
            else if ("koDom" in menuitem)
            {
                element = menuitem.element();
            }
            else if ("nodeName" in menuitem)
            {
                element = menuitem;
            }
            else
            {
                var type = menuitem.type || "menuitem";
                
                if ("menuitems" in menuitem)
                {
                    type = "menu";
                }
                
                element = require('./' + type).create(menuitem).element;
            }
            
            this.menupopup.$element.append(element);
            
            if (element.getAttribute("selected") == "true" && "selectedItem" in this.element)
            {
                this.element.selectedItem = element;
            }
        };
        
    }).apply(this.Model); 
    
}).apply(Module);
