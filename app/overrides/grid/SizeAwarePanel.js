Ext.define('MyApp.override.grid.SizeAwarePanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'sizeawaregrid',
    listeners: {
        resize: 'onResize'
    },
    onResize: function(width, height, oldWidth, oldHeight) {
        
        var me = this,
            headerHeight = 40,
            pagingToolbarHeight = 85,
            rowHieght = 34,
            viewHeight = me.getHeight() - headerHeight - pagingToolbarHeight,
            pageSize =  Math.floor(viewHeight / rowHieght);
        
        
        Ext.log('MyApp.override.grid.SizeAwarePanel onResize, view height: ' + viewHeight + ', setting pageSize to ' + pageSize);
        
        var store = me.getStore();
        
        if (store.storeId == 'ext-empty-store') {
            var pass = 0;
            
            var waitForStore = function() {
                Ext.Function.defer(function(){
                    
                    store = me.getStore();                        
                    
                    if (store.storeId == 'ext-empty-store') {
                        if (pass > 10) {
                            store.loadPage(1);
                        } else {
                            waitForStore();
                        }
                    } else {
                        store.setPageSize(pageSize);
                        store.loadPage(1);
                    }
                    
                }, 1);
                
                pass++;
            }
            
            waitForStore();
        } else {
            store.setPageSize(pageSize);
            store.loadPage(1);
        }
    }
});
