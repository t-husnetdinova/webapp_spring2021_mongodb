const express = require("express"), app = express();
layouts = require("express-ejs-layouts"), mongoose = require("mongoose");
homeController = require("./controllers/homeController");
errorController = require("./controllers/errorController");
subscribersController = require("./controllers/subscribersController");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", 
{useNewUrlParser: true});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);

app.get("/", homeController.showIndex);

app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

// routes 
app.get("/courses", homeController.showCourses);
// app.get("/contact", homeController.showSignUp);
// app.post("/contact", homeController.postedSignUpForm);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

// error handling
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});