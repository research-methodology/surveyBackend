const url =`https://cst-survey-frontend.herokuapp.com`
class emailMocks{
    static async signUp(mailOptions) {
        let newUrl = url + mailOptions
        return `
            <div style="width:80%;border:1px solid black;margin :auto;border-radius: 23px;padding-left:32px;">
            <div style="text-align:center;padding-top: 23px;color:#808080 ">
            <h1>Message</h1>
            <hr style="width:50%"/>
            </div>
            <div >
            <h2>hello Sir/Madam<h2><br>
            <p>Thanks for registering on our site. Please click the link below to verify your account.</p>
            <p><a href="${newUrl}" style="font-size:12px">${newUrl}</a></p>
                    <p>Please note that if you do not verify your email address within 3 days, the verification code above will expire and you will need to re-register again.</p>
            </div>
        </div>
    `
    }
}
export default emailMocks