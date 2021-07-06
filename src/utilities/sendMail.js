//copy and past this link in your browser : https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4M53SOejDQbPl-7Fim2YAdoGCgroeuzs4SyI7XBKEeyphNErP5YowKaEiwxw1EygZF-UjC91kpE8SWOPska2TrzgsZDFg
//then enable it
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendEmail= async (mailOptions)  => {
    //console.log(mailOptions);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : process.env.EMAILNAME_AUTH,
            pass : process.env.EMAILPASSWORD_AUTH

   
        }
    });
    const Options = {
        from: `Survey App <citeplusdev@gmail.com>`,
        to: mailOptions.email,
        subject: "your are receiving this email because you signup on our system",
        html: `
                <div style="width:80%;border:1px solid black;margin :auto;border-radius: 23px;padding-left:32px;">
                  <div style="text-align:center;padding-top: 23px;color:#808080 ">
                    <h1>Message</h1>
                    <hr style="width:50%"/>
                  </div>
                  <div >
                    <h2>hello Sir/Madam<h2><br>
                    <p>Thanks for registering on our site. Please click the link below to verify your account.</p>
                    <p><a href="${mailOptions.url}" style="font-size:12px">${mailOptions.url}</a></p>
                            <p>Please note that if you do not verify your email address within 3 days, the verification code above will expire and you will need to re-register again.</p>
                  </div>
                </div>
              `

    }
    await transporter.sendMail(Options, (error) => {
        if (error) {
            console.log("email sent fails",error)
           // return false
        } else {
            console.log("Email sent successfull")
          //  return true
        }
    })
}
