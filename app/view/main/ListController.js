/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyApp.view.main.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.list',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    
    onPostSubmit: function(button) {
        var form = button.up('form');
        
        if (form.isValid()) {
            
            var post = Ext.create('MyApp.model.Post', form.getValues());

            post.save();
        }
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    
    onPersonnelEdit: function(btn) {
        var rec = btn.getWidgetRecord();
        // do stuff here
    }
});
