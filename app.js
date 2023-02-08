const { exec } = require('child_process');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'desarrollo@sipcommbsas.com',
    pass: ''
  }
});

const email_to = [
    "andabopa@gmail.com",
    "dbarreto@sipcommbsas.com",
    "desarrollo@sipcommbsas.com"
]

const servers = [
    "xxx.xxx.xxx.xxx",
    "xxx.xxx.xxx.xxx",
]

setInterval(() => {
    console.log("Starting monitor")
    servers.forEach(i => {
        console.log("ping to " + i);
        const mailOptions = {
            from: '"Server Monitoring" <desarrollo@sipcommbsas.com>',
            to: email_to.join(","),
            subject: 'Server Down Alert',
            text: 'Your server ' + i + ' is down. Please take a look.'
          };

        exec('ping ' + i, (error, stdout, stderr) => {
            if (error) {
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log("down " + i);
                console.log('Message sent: %s', info.messageId);
              });
            }
        });
    });
}, 3600 * 1000);
