Ext.define('MyApp.override.grid.SizeAwarePanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'sizeawaregrid',
    
    defaultListenerScope: true,
    listeners: {
        resize: 'onResize'
    },
    onResize: function(width, height, oldWidth, oldHeight) {
        
        var view = this.getView();
        
        var pageSize = Math.floor(view.getHeight() / 34);
        
        Ext.log('MyApp.override.grid.SizeAwarePanel onResize, view height: ' + view.getHeight() + ', setting pageSize to ' + pageSize);
        
        var store = this.getStore();
        
        store.on('beforeload', function(store) {
            Ext.log('MyApp.override.grid.SizeAwarePanel store.beforeload');
        });
        
        /*
        console.log(store.storeId);
        if (store.storeId == 'ext-empty-store') {
            console.log('we are here 1');
            // wait till we bind the actual store instance
            Ext.Function.defer(function(){
                console.log('we are here 3');
                store.setPageSize(pageSize);
                store.loadPage(1);
            }, 1000);
        } else {
            console.log('we are here 2');
            store.setPageSize(pageSize);
            store.loadPage(1);            
        }*/
    }
});
