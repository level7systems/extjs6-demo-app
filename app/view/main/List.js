/**
 * This view is an example list of people.
 */
Ext.define('MyApp.view.main.List', {
    extend: 'MyApp.override.grid.SizeAwarePanel',
    xtype: 'mainlist',
    
    requires: [
        'MyApp.view.main.ListController',
        'MyApp.override.grid.SizeAwarePanel',
        'MyApp.store.Personnel',
        "Ext.toolbar.Paging"
    ],
    
    controller: 'list',
    
    viewModel: 'list',

    title: 'Personnel',

    bind: {
        store: '{personnel}'
    },

    columns: [
        {
            text: '',
            width: 60,
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'button',
                iconCls: 'x-fa fa-pencil-square-o',
                handler: 'onPersonnelEdit'
            }
        },
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
