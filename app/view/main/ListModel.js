Ext.define('MyApp.view.main.ListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.list',
    stores: {
        personnel: {
            type: 'personnel'
        }
    }
});
