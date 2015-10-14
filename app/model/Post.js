Ext.define('MyApp.model.Post', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'title', type: 'string' },
        { name: 'body', type: 'string' }
    ],
    
    proxy: {
        type: 'rest',
        url: 'http://jsonplaceholder.typicode.com/posts',
        reader: {
            rootProperty: 'posts'
        }
    }
});
