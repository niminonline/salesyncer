import nodemailer from 'nodemailer';


 export const sendPassword= async (email:string, randomPassword:string) =>{
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.aurabeaut@gmail.com",
        pass: "bdzaicivbiwkkoua",
      },
    });
    const mailOptions = {
      from: "noreply.aurabeaut@gmail.com",
      to: email,
      subject: "Salesyncer user created",
      text: `Hello,
        Greetings from Salesyncer.
        Your password to access salesyncer account is ${randomPassword} 
        Login URL: http://localhost:4200/login 
        This is a system generated e-mail and please do not reply.
        Regards,
        Team Salesyncer`,
    };
    const result = await transporter.sendMail(mailOptions);
    // console.log(result);
  } catch (error:any) {
    console.error(error.message);

  }
}


 export const  generateRandomPassword=  (length: number): string =>{
    const charset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password: string = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
  
    return password;
  }
  


//   const randomPassword: string = generateRandomPassword(8);
//   console.log(randomPassword);
  