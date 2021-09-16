# *How to get the repo into your PC:*
* Step 1: Copy URL of the repo
* Step 2: In the terminal go to the desired folder and enter `git clone <https://github.com/Hell3ringer/dbms_project>`

# *How to start the website:*
  * Step 1: Open terminal and make sure you are in the folder which has all files
  * Step 2: Type command `npm install`. This installs necessary node modules
  * Step 3: Run command `npm start`. You can now see that the Front-end of the website is running in your browser.
  * Step 4: Open 'XAMPP control panel' app (you can download xampp from [XAMPP official website](https://www.apachefriends.org/download.html) and start apache and MySQL modules
  * Step 5: Open [Local host server](http://localhost/phpmyadmin/index.php?) in browser which shows databases, tables etc which are there in your MySQL. Click on *'Import'* in top menu. Upload the file named *'database_sql.sql'* present in *'backend'* folder. Now you can see a database is created which has some tables, this is the database of our website.
  * Step 6: In another terminal, move to the folder named *'backend'*
  * Step 7: No need to run npm install here as the node_modules are already present. You can do `npm install` if the current node_modules do not support your version.
  * Step 8: run command `npm start` and your server starts now.
   - [x] Finally both the frontend and backend have started, now you can use the website.
  
# *How to use website:*
  * Firstly you have to signup and enter your details
  * You cannot signin to website unless you are verified by any administrator, so please wait while the administrator verifies your account.
> Administrator: There is a main administrator with id: `20190000H` and password:`123`. Login with these credentials as an administrator and verify the accounts.
  
  - [x] After your account is verified, you can signin
  

# *Usage of the website:*
  * Students can view feedbacks of the courses and professors to choose the courses and professors before the start of the semester.
  * Professors can view feedbacks and reviews given to him by students.
  * Student can give feedback to the registered courses. Feedback/review are completely anonymous.
  * Administrator can add/delete/modify courses, assign professors to the course.
