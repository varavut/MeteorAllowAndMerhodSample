if (Meteor.isClient) {
    Template.secure.helpers({
        threads: () => {
            return Threads.find({
                $or: [
                    {
                        deletedAt: null
                    },
                    {
                        deletedAt: {
                            $exists: false
                        }
                    }
                ]
            });
        }
    });

    Template.secure.events({
        'click #create-thread-direct': function () {
            Threads.insert({
                title: 'create-thread-direct'
            });
        },
        'click #create-thread-direct-with-fake-user-id': function () {
            Threads.insert({
                title: 'create-thread-direct-with-fake-user-id',
                owner: 'fake'
            });
        },
        'click #create-thread-direct-with-deletedat': function () {
            Threads.insert({
                title: 'create-thread-direct-with--deletedat',
                deletedAt: new Date()
            });
        },
        'click #create-thread-methods': function () {
            Meteor.call('Threads.create', 'create-thread-methods', function (err, res) {
                if (err)
                    return console.error(err);
                return console.log(res);
            })
        },
        'click .delete-direct': function (event) {
            var threadId = event.target.attributes['data-id'].value;
            Threads.remove(threadId);
        },
        'click .delete-methods': function (event) {
            var threadId = event.target.attributes['data-id'].value;
            Meteor.call('Threads.delete', threadId, function (err, res) {
                if (err)
                    return console.error(err);
                return console.log(res);
            })
        }
    });
}