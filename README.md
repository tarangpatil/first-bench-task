# FirstBench Task

**FirstBench.ai Internship Task**

**Postman Collection Link**: [Postman Collection](https://www.postman.com/tarangpatil21/workspace/first-bench-task/collection/36976000-152da616-f133-4ee3-974a-479e4183e3ab?action=share&creator=36976000)

---

## Answers to the Questions from the Google Form

### **Q1. Does it mean we delete the account from the database or we can keep the user data but not allow them to log in? Think of the best possible solution.**

**Answer**:  
Whether to keep user data when an account is deactivated depends on the use case of the application and the organization. In this codebase, the user data is kept intact, and a `status` flag is added to indicate whether the account is active or inactive. This setup also allows reactivation of accounts in case the user decides to do so.

---

### **Q2. How do you manage a super admin and its login feature? Do we need to create a separate database table to save their details? Also, what is the best way to create a Super Admin account? Should the Super Admin also register with an email and password like a normal user?**

**Answer**:  
There are various ways of managing admins and super admins. Logging in as an admin, in most cases, may not differ from logging in as a normal user.  

Creating a separate table to store admins depends on the application use case (e.g., whether we would like to have both admin and normal accounts with the same email and phone number in order to separate their personal and professional accounts).  

This implementation uses a single table, `Users`, which contains both admin and normal user accounts. As a result, a person cannot be both a user and an admin at the same time.  

The best way to create a super admin would be to manually create entries through database administration, as anything else would pose security concerns. This codebase has implemented an alternative: Only admins can create and delete other admin accounts, and there must always be at least one admin account (you cannot delete the last admin account). Initially, one admin account must be created using a manual MongoDB query.
