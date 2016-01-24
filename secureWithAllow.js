if (Meteor.isServer) {
    Threads.allow({
        insert: function (userId, doc) {
            if(!userId)
                throw new Meteor.Error('Unauthorized', 'Please login before perform an action');
            check(doc.title, String);
            if (doc.owner && doc.owner != userId)
                throw new Meteor.Error('No permission', 'Can\'t create a thread in the name of other');
            doc.owner = userId;
            doc.createdAt = new Date();
            doc.updatedAt = new Date();
            doc.deletedAt = null;
            return true;
        },
        remove: function (userId, doc) {
            if(!userId)
                throw new Meteor.Error('Unauthorized', 'Please login before perform an action');
            return result = doc.owner === userId;
        },
    });
}