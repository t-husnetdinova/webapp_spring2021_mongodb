const Subscriber = require("../models/subscriber");

// function that retreives all subscribers
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
        .exec()
        .then(subscribers => {
            res.render("subscribers", {subscribers: subscribers})
        })
        .catch((error) => {
            console.log(error);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        })
};

// function provides sign up page for users
exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

// retrives the posted data from the req body and saves a new subscriber
exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    })
    newSubscriber.save()
        .then(() => {
            res.render("thanks");
        })
        .catch(error => {
            res.send(error);
        })
};