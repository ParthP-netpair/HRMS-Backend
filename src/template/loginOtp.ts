type TLoginOtpVars = {
  otp: number;
  ExpirationTime: string;
};

const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your OTP Code</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>Login OTP Code</h1>
        <p>
            We have received a request to verify your identity. Please use the
            following One-Time Password (OTP) to proceed:
        </p>
        <p class="otp">{{otp}}</p>
        <p>
            This code is valid for the next {{ExpirationTime}} minutes. Please do not share it with
            anyone.
        </p>
        <p>Thank you!</p>
        </div>
    </body>
    </html>
  `;

export default (variable: TLoginOtpVars) => {
  const subject = "One-Time Password for Your Login Request";
  const replaced = template.replace(/{{(\w+)}}/g, (match, p1) => {
    return variable[p1] || "-";
  });
  return { template: replaced, subject };
};
