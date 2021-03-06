/*global define*/
/*global test*/
/*global equal*/
// /*global notDeepEqual*/
define([
    'models/notebook',
    'collections/notebooks',
    'migrations/notebooks'
], function (Notebook, Notebooks, DB) {
    'use strict';

    module('Notebooks collection', {
        setup: function () {
            this.notebooks = new Notebooks();

            this.notebook = new Notebook({
                id: this.notebooks.nextOrder()
            });
            this.notebooks.add(this.notebook);

            this.secondNotebook = new Notebook({
                name: 'Hello, world',
                id: this.notebooks.nextOrder()
            });
            this.notebooks.add(this.secondNotebook);
        },

        teardown: function () {
            window.errors = null;
        }
    });

    test('Can generate right order numbers', function () {
        var notebook = new Notebook({
            id: this.notebooks.nextOrder()
        });
        equal(notebook.get('id'), 3);
    });

    test('Has the Notebook model', function () {
        equal(this.notebooks.model, Notebook);
    });

    test('Notebooks is added to collection', function () {
        equal(this.notebooks.length, 2);
    });

    test('Uses indexedDB', function () {
        equal(this.notebooks.database.id, DB.id);
    });

});
