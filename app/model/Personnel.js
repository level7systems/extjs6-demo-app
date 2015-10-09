Ext.define('MyApp.model.Personnel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'name'
        },
        {
            type: 'string',
            name: 'email'
        },
        {
            type: 'string',
            name: 'phone'
        }
    ],
    
    proxy: {
        type: 'rest',
        url : 'http://127.0.0.1:3000/personnel',
        reader: {
            rootProperty: 'personnel'
        }
    }
});
