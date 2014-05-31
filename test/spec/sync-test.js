/* global define, describe, beforeEach, it */
define([
    'chai',
    'helpers/sync/remotestorage',
    'helpers/sync/dropbox',
    'models/note'
], function (chai, RemoteSync, DropboxSync, Note) {
    'use strict';

    var expect = chai.expect;

    function testStorage (syncStorage, storageName) {

        describe(storageName + ' adapter', function () {
            var note,
                id;

            beforeEach(function () {
                Note.prototype.sync = syncStorage;
                note = new Note();
            });

            describe('Backbone.Model and ' + storageName, function () {

                it('can use ' + storageName + ' as a sync adapter', function () {
                    expect(note.sync === syncStorage).to.be.equal(true);
                });

                it('can save data to ' + storageName, function (done) {
                    var data = {
                        title: 'Hello world',
                        content: 'Random content'
                    };
                    note.save(data, {
                        success: function () {
                            id = note.get('id');
                            expect(typeof id).to.be.equal('string');
                            expect(note.get('title')).to.be.equal(data.title);
                            done();
                        }
                    });
                });

                it('can access data from ' + storageName, function (done) {
                    var noteNew = new Note({id: id});

                    // Try to fetch data from RemoteStorage
                    $.when(noteNew.fetch()).done(function () {
                        expect(noteNew.get('id')).to.be.equal(id);
                        done();
                    });
                });

                it('can remove data from ' + storageName, function (done) {
                    var noteNew = new Note({id: id});

                    // Try to fetch data from RemoteStorage
                    $.when(noteNew.destroy()).done(function () {
                        done();
                    });
                });

            });

        });
    }

    // Test RemoteStorage
    testStorage(RemoteSync, 'RemoteStorage');

    // Test Dropbox
    testStorage(DropboxSync, 'Dropbox');

});