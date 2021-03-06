'use strict';

let config = require('../config/mongo');
let mongodb = require('mongodb');
let mongoClient = mongodb.MongoClient;

let mongo = (function () {
    let connection = mongoClient.connect(config.mongodb.connection);

    let getCollection = async function (c) {
        return connection.then(function (db) {
            return db.collection(c);
        });
    };

    let insertOne = async function (c, object) {
        return getCollection(c)
            .then(function (collection) {
                return collection.insertOne(object);
            });
    };

    let findOne = async function (c, object) {
        return getCollection(c)
            .then(function (collection) {
                return collection.findOne(object);
            });
    };

    let find = async function (c, query, sort) {
        return getCollection(c)
            .then(function (collection) {
                let cursor = collection.find(query);

                if (sort) {
                    cursor = cursor.sort(sort);
                }
                return cursor.toArray();
            });
    };

    let updateOne = async function (c, query, update) {
        return getCollection(c)
            .then(function (collection) {
                return collection.updateOne(query, update);
            });
    };

    /**
     * Updates multiple documents within the collection based on the query.
     * https://docs.mongodb.com/v3.2/reference/method/db.collection.updateMany/
     *
     * @param {String} c - collection name
     * @param {Object} query - The selection criteria for the update
     * @param {Object} update - The modifications to apply
     * @param {Boolean} options.upsert - (optional) When true, updateMany() either:
     *                                   * Creates a new document if no documents match the filter.
     *                                   * Updates documents that match the filter.
     * @param {Object} options.writeConcern - (optional) A document expressing the write concern.
     Omit to use the default write concern.
     * @returns {Promise.<TResult>}
     */
    let updateMany = async function (c, query, update, options) {
        return getCollection(c)
            .then(function (collection) {
                return collection.updateMany(query, update, options);
            });
    };

    /**
     * See https://docs.mongodb.com/manual/aggregation/
     * Use aggregation for custom queries
     *
     * @param c - collection name
     * @param query - array of aggregation commands
     *                (see https://docs.mongodb.com/manual/reference/operator/aggregation/interface/)
     * @returns {Promise.<TResult>}
     */
    let aggregation = async function (c, query) {
        return getCollection(c)
            .then(function (collection) {
                return collection.aggregate(query).toArray();
            });
    };

    /**
     * Remove documents from database bu query params
     *
     * @param c - collection name
     * @param query
     * @returns {Promise.<TResult>}
     */
    let remove = async function (c, query) {
        return getCollection(c)
            .then(function (collection) {
                return collection.remove(query);
            });
    };

    let createCollection = async function (name) {
        return connection.then(function (db) {
            return db.createCollection(name);
        });
    };

    return {
        findOne : findOne,
        insertOne : insertOne,
        find: find,
        ObjectId: mongodb.ObjectId,
        aggregation: aggregation,
        updateOne: updateOne,
        updateMany: updateMany,
        remove: remove,
        createCollection: createCollection
    };
})();

module.exports = mongo;