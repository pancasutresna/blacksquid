﻿//#region Copyright, Version, and Description
/*
 * Copyright 2014 IdeaBlade, Inc.  All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the IdeaBlade Breeze license, available at http://www.breezejs.com/license
 *
 * Author: Ward Bell
 * Version: 2.0.0
 * --------------------------------------------------------------------------------
 * Adds "Save Queuing" capability to new EntityManagers
 * "Save Queuing" automatically queues and defers an EntityManager.saveChanges call
 * when another save is in progress for that manager.
 *
 * Without "Save Queuing", an EntityManager will throw an exception when
 * saveChanges is called while another save is in progress.
 *
 * "Save Queuing" is experimental. It may become part of BreezeJS in future
 * although not necessarily in this form or with this API
 *
 * Must call EntityManager.enableSaveQueuing(true) to turn it on;
 * EntityManager.enableSaveQueuing(false) restores the manager's original
 * saveChanges method as it was at the time saveQueuing was first enabled.
 *
 * This module adds "enableSaveQueuing" to the EntityManager prototype.
 * Calling "enableSaveQueuing(true)" adds a new _saveQueuing object
 * to the manager instance.
 *
 * See DocCode:saveQueuingTests.js
 * https://github.com/Breeze/breeze.js.samples/blob/master/net/DocCode/DocCode/tests/saveQueuingTests.js
 *
 * !!! Use with caution !!!
 * "Save Queuing" is recommended only in simple "auto-save" scenarios wherein
 * users make rapid changes and the UI saves immediately as they do so.
 * It is usually better (and safer) to disable save in the UI
 * while waiting for a prior save to complete
 *
 * LIMITATIONS
 * - Saves all pending changes; no support for saving selected entities
 * - Can't queue save options
 * - Can't handle changes to the primary key (dangerous in any case)
 * - Assumes promises. Does not support the (deprecated) success and fail callbacks
 * - Does not queue saveOptions. The first one is re-used for all queued saves.
 * - The saveResult is the saveResult of the LAST completed save
 *
 * All members of EntityManager._saveQueuing are internal;
 * touch them at your own risk.
 */
//#endregion
(function (definition, window) {
    if (window.breeze) {
        definition(window.breeze);
    } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node
        var b = require('breeze');
        definition(b);
    } else if (typeof define === "function" && define["amd"] && !window.breeze) {
        // Requirejs / AMD
        define(['breeze'], definition);
    } else {
        throw new Error("Can't find breeze");
    }
}(function (breeze) {
    'use strict';
    var EntityManager = breeze.EntityManager;

    /**
    Enable (default) or disable "Save Queuing" for this manager
    **/
    EntityManager.prototype.enableSaveQueuing = function (enable) {
        enable = enable === undefined ? true : enable;
        if (!this._saveQueuing) {
            this._saveQueuing = new SaveQueuing(this);
        }
        if (enable) {
            this.saveChanges = saveChangesWithQueuing;
        } else {
            this.saveChanges = this._saveQueuing.baseSaveChanges;
        }
    };


    var SaveQueuing = function (entityManager) {
        this.entityManager = entityManager;
        this.baseSaveChanges = entityManager.saveChanges;
        this.isSaving = false;
        this.queuedDeferred = null;
        this.saveMemo = null;
    };

    SaveQueuing.prototype.isEnabled = function () {
        return this.entityManager.saveChanges === saveChangesWithQueuing;
    };

    /**
    Replacement for EntityManager.saveChanges, extended with "Save Queuing"
    **/
    function saveChangesWithQueuing(entities, saveOptions) {
        var saveQueuing = this._saveQueuing;

        if (saveQueuing.isSaving) {
            // save in progress; queue the save for later
            return saveQueuing.queueSaveChanges();
        } else {
            // note that save is in progress; then save
            saveQueuing.isSaving = true;
            saveQueuing.saveOptions = saveOptions;
            return saveQueuing.innerSaveChanges(entities, saveOptions);
        }
    }


    SaveQueuing.prototype.queueSaveChanges = function queueSaveChanges() {
        var self = this;
        var changes = self.entityManager.getChanges();
        var memo = self.saveMemo || (self.saveMemo = new SaveMemo());
        memo.rememberChanges(changes);

        var deferred = self.queuedDeferred || (self.queuedDeferred = breeze.Q.defer());
        return deferred.promise;
    };

    SaveQueuing.prototype.innerSaveChanges = function (entities, saveOptions) {
        var self = this;
        return self.baseSaveChanges.call(self.entityManager, entities, saveOptions || self.saveOptions)
            .then(function (saveResult) { return self.saveSucceeded(saveResult); })
            .then(null, function (error) { return self.saveFailed(error); });
    };

    // Default methods and Error class for initializing new saveQueuing objects
    SaveQueuing.prototype.saveSucceeded = defaultSaveSucceeded;
    SaveQueuing.prototype.saveFailed = defaultSaveFailed;
    SaveQueuing.prototype.QueuedSaveFailedError = QueuedSaveFailedError;

    function defaultSaveSucceeded(saveResult) {
        var self = this;
        if (self.saveMemo) {
            // a save was queued since last save returned
            self.saveMemo.fixup(saveResult.keyMappings);
            self.saveMemo.applyAfterSave(self.entityManager, saveResult.entities);
            self.saveMemo = null;
            if (self.entityManager.hasChanges()) {
                // save again
                self.innerSaveChanges();
                return saveResult;
            }
        } 
        // nothing queued or left to save
        self.isSaving = false;
        var deferred = self.queuedDeferred;
        if (deferred) {
            self.queuedDeferred = null;
            deferred.resolve(saveResult);
        }
        return saveResult;
    };

    function defaultSaveFailed(error) {
        var self = this;
        self.isSaving = false;
        error = new self.QueuedSaveFailedError(error, self);
        var deferred = self.queuedDeferred;
        if (deferred) {
            self.queuedDeferred = null;
            deferred.reject(error);
        }
        // so rest of current promise chain can hear error
        return breeze.Q.reject(error);
    }

    ////////// QueuedSaveFailed /////////
    //Custom Error sub-class; thrown when rejecting queued saves.
    function QueuedSaveFailedError(errObject) {
        this.name = "QueuedSaveFailedError";
        this.message = "Queued save failed";
        this.innerError = errObject;
    }

    QueuedSaveFailedError.prototype = new Error();
    QueuedSaveFailedError.prototype.constructor = QueuedSaveFailedError;


    ////////// SaveMemo Type ////////////////
    function SaveMemo(){ 
        this.memos = {};
    }

    function makeMemosKey(entity){
        var entityKey = entity.entityAspect.getKey();
        return entityKey.entityType.name+'|'+entityKey.values;
    }

    SaveMemo.prototype.fixup = function fixup(keyMappings){
        var memos = this.memos;
        keyMappings.forEach(function(km){
            var type = km.entityTypeName;
            var tempKey = type+'|'+km.tempValue;
            if (memos[tempKey]){
                memos[type+'|'+km.realValue] = memos[tempKey];
                delete memos[tempKey];
            }
            for (var mKey in memos){
                memos[mKey].fkFixup(km);
            }
        });
    }

    SaveMemo.prototype.applyAfterSave = 
        function applyAfterSave(entityManager, savedEntities){
            var memos = this.memos;
            var restorePublishing = disableManagerPublishing(entityManager);
            try {
                savedEntities.forEach(function(saved){
                    var key = makeMemosKey(saved);
                    var memo = memos[key];
                    memo && memo.applyAfterSave(saved);
                });               
            } finally {
               restorePublishing();
               // D#2651 hasChanges will be wrong if changes made while save in progress
               var hasChanges = entityManager.getChanges().length > 0;
               // Must use breeze internal method to get this flag set properly
               if (hasChanges) {entityManager._setHasChanges(hasChanges);}
            }
        }

    function disableManagerPublishing(manager){
        var Event = breeze.core.Event;
        Event.enable('entityChanged', manager, false);
        Event.enable('hasChangesChanged', manager, false);

        return function restorePublishing(){
            Event.enable('entityChanged', manager, false);
            Event.enable('hasChangesChanged', manager, false);        
        }
    }

    SaveMemo.prototype.rememberChanges = function rememberChanges(changes){
        var memos = this.memos;
        changes.forEach(function(change){
            var key = makeMemosKey(change);
            var memo = memos[key] || (memos[key] = new EntityMemo(change));
            memo.update(change);
        });
    }

    ///////// EntityMemo Type ///////////////
    function EntityMemo(entity) {
        this.entity = entity;
        this.pendingChanges = {};
    }

    EntityMemo.prototype.applyAfterSave = function applyAfterSave(saved){
        var memo = this;
        var hasChanges = false;
        var aspect = saved.entityAspect;
        if (aspect.entityState.isDetached()){
            // must have been deleted
        } else if (memo.isDeleted){
            aspect.setDeleted();
            hasChanges = true;
        } else {
            var props = Object.keys(memo.pendingChanges);
            props.forEach(function(name){
                var change = memo.pendingChanges[name];
                if (saved.getProperty(name) !== change){
                    saved.setProperty(name, change);
                    hasChanges = true;
                }
            });
            if (hasChanges){ aspect.setModified(); }
        }
        return hasChanges;
    }

    EntityMemo.prototype.fkFixup = function fkFixup(keyMapping){
        var memo = this;
        var type = memo.entity.entityType;
        var fkProps = type.foreignKeyProperties;
        fkProps.forEach(function(fkProp){
            if (fkProp.parentType.name === keyMapping.entityTypeName &&
                memo.pendingChanges[fkProp.name] === keyMapping.tempValue) {
                memo.pendingChanges[fkProp.name] = keyMapping.realValue;
            }
        });
    }

    EntityMemo.prototype.update = function update(){
        var memo = this;
        var props;
        var entity = memo.entity;
        var aspect = entity.entityAspect;
        var stateName = aspect.entityState.name;
        switch(stateName) {
            case 'Added':
            props = entity.entityType.dataProperties;
            props.forEach(function(dp){
                if (dp.isPartOfKey){ return; }
                memo.pendingChanges[dp.name] = entity.getProperty(dp.name);
            });
            break;

            case 'Deleted':
            memo.isDeleted = true;
            memo.pendingChanges={};
            break;

            case 'Modified':
            props = Object.keys(aspect.originalValues);
            props.forEach(function(name){
                memo.pendingChanges[name] = entity.getProperty(name);
            });
            break;
        }
    }

}, this));