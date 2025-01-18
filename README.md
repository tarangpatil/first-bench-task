# first-bench-task

FirstBench.ai internship task

## Following is the assignment

Assignment for Backend Developer Internship

**Objective:**

Evaluate your understanding of backend development principles, problem-solving skills, so just blindly copying from AI Tools wont help.

Problem Statement:

Create a RESTFul API for User Management System using Node.js, Express.js Framework, MongoDb.

**Features:**

A user should be able to create an account using name, email, password, phone number.

Registered user should be able to login using email and password.

User should be able to see their corresponding details (name, email, phone number) and should be able to update them.

User should also have the ability to deactivate their account.

Key Decision: Does it mean we delete the account from the database or we can keep the user data but not allow them to login, Think of the best possible solution.

There should be a Super Admin who has the ability to get the details of all the users upon logging in.

Key Decision:How do you manage a super admin and its login feature? Do we need to create a separate Database table to save their details? Also what is the best way to create a Super Admin account, should Super Admin also register with email and password like normal user?

**Things to keep in mind:**

Add constraints say, for example check if the email format entered is correct or not, password is at least 8 characters. Make sure to add constraints in Schema design as well, wherever necessary.

Show graceful message wherever required, for example on invalid login.

Handle edge cases like already registered user cannot register again (Basically no 2 or more user entries should be with the same email)

Include a README file with basic feature and instructions for project setup.

Create a Postman collection for testing the APIs.

**Submission:**

Upload the code on any version control platform(GitHub, GitLab etc) and share the link of the public repository link. (Make sure to have proper commit messages)

Share the Postman collection link with all APIs added.

- Design
