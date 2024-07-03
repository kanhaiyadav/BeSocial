const queue = require('../config/kue');

const like_mailer = require('../mailers/like_mailer.js');

queue.process('emails', function (job, done) {
    console.log('task email worker is processing a job', job.data);
    like_mailer.post_liked(job.data);
    done();
})