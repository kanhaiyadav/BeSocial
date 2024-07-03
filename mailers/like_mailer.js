const nodeMailer = require("../config/nodemailer");


module.exports.post_liked = (LikedUser) => {
    let htmlString = nodeMailer.renderTemplate({ LikedUser: LikedUser }, '/like/post_liked.ejs');
    console.log(LikedUser);
    nodeMailer.transporter.sendMail({
        from: 'kanhaiya.yadav.ds26@heritageit.edu.in',
        to: LikedUser.email,
        subject: "Post Liked",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log("Error in sending mail", err);
            return;
        }
        console.log("message sent", info);
        return;
    });
}