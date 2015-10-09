/**
 * This view is an example list of people.
 */
Ext.define('MyApp.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'MyApp.store.Personnel',
        "Ext.toolbar.Paging"
    ],
    
    viewModel: 'list',

    title: 'Personnel',

    bind: {
        store: '{personnel}'
    },

    columns: [
        { text: 'Name',  dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ],
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{personnel}'
        },
        dock: 'bottom',
        displayInfo: true
    }],

    listeners: {
        select: 'onItemSelected'
    }
});
