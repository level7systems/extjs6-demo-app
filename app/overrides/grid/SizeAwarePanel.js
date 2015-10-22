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
        store.setPageSize(pageSize);
        store.reload();
    }
});
