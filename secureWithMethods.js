Meteor.methods({
    'Threads.create': function (title) {
        if (!this.userId)
            throw new Meteor.Error('Unauthorized', 'Please login before perform an action');
        check(title, String);
        Threads.insert({
            title: title,
            owner: this.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return { message: 'Threads.create OK' };
    },
    'Threads.delete': function (threadId) {
        if (!this.userId)
            throw new Meteor.Error('Unauthorized', 'Please login before perform an action');
        check(threadId, String);
        Threads.remove({
            _id: threadId,
            owner: this.userId,
        });
        return { message: 'Threads.delete OK' };
    }
});
