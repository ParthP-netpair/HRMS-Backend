"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template = `
  <!doctype html>
    <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Password Reset</title>
          <style>
          /* Basic styles for email */
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #f9f9f9;
          }
          .btn {
              display: inline-block;
              background-color: #095aac;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
          }
          </style>
      </head>
      <body>
          <div class="container">
          <h2>Password Reset</h2>
          <p>Hi <strong>{{Name}}</strong>,</p>
          <p>You have requested to reset your password. Please click the button below to proceed.</p>
          <p><strong>Reset Link:</strong></p>
          <p><a class="btn" href="{{ResetLink}}" target="_blank">Reset Password</a></p>
          <p>This link will expire in <strong>{{ExpirationTime}} minutes</strong>.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <p>Thank you!</p>
          </div>
      </body>
    </html>
`;
exports.default = (variable) => {
    const subject = 'Reset your password';
    const replaced = template.replace(/{{(\w+)}}/g, (match, p1) => {
        return variable[p1] || '-';
    });
    return { template: replaced, subject };
};
