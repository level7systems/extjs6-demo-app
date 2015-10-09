Ext.define('MyApp.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',
    
    model: 'MyApp.model.Personnel',
    
    autoLoad: true,
    
    listeners: {
        load: function(store) {
            console.log('######### load MyApp.store.Personnel');
            console.log(store);
        }
    }
});
