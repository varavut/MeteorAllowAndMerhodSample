Posts = new Meteor.Collection('posts');

Posts.allow({
    insert: function (userId, doc) {
        console.log('insert validation begin', new Date());
        console.log(userId);
        console.log(doc);
        var result = userId && doc.owner === userId;
        console.log('insert validation end with result', result);
        return result;
    },
    update: function (userId, doc, fields, modifier) {
        console.log('update validation begin', new Date());
        console.log(userId);
        console.log(doc);
        console.log(fields);
        console.log(modifier);
        var result = doc.owner === userId;
        console.log('update validation end with result', result);
        return result;
    },
    remove: function (userId, doc) {
        console.log('remove validation begin', new Date());
        console.log(userId);
        console.log(doc);
        var result = doc.owner === userId;
        console.log('remove validation end with result', result);
        return result;
    },
    transform: function (doc) {
        console.log('transform begin', new Date());
        console.log('transform end');
        return doc;
    },
    fetch: ['owner', 'content']
});

Meteor.methods({
        'post': function (content) {
            console.log(this.userId);
            console.log('post methods begin');
            console.log(content);
            if (!this.userId) {
                console.log('post not performed, missing userId');
                console.log('post methods end');
                return;
            }
            Posts.insert({owner: this.userId, content: content, createdAt: new Date()});
            console.log('post performed');
            console.log('post methods end');
        }
    });

if (Meteor.isClient) {
    Template.hello.helpers({
        posts: function(){
            return Posts.find();
        }
    });

    Template.hello.events({
        'click #post-methods': function(){
            var rand = Math.round(Math.random()*100);
            Meteor.call('post', 'post from method '+rand, function (err, res) {
                if(err){
                    return console.log('client post failed');
                }
                console.log('client post success');
            });
        },
        'click #post-direct': function(){
            var rand = Math.round(Math.random()*100);
            Posts.insert({owner: Meteor.userId(), content: 'post direct '+rand, createdAt: new Date()});
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
