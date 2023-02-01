# Separate API Keys per user in your project.
1. Create a file at the root of your repository called .gitignore
2. Add the following line to the file
  keys.js
3. Add, commit, and push your .gitignore file to the repository.
4. Have everyone pull from the repository.
5. Everyone should confirm they have the .gitignore file locally.
6. Add a file in your project called keys.js
* Because this file is in your .gitignore, git will not track it.
7. In keys.js, define a global variable or set of variables in this file:

        var omdbApiKey=3k45j4k623j6k14;
        var openWeatherApiKey=9E92A9EV239V29V82V2;

8. Use those variables in your project.

        <script src="keys.js"></script>
        <script src="project.js"></script>

9. When you deploy to github pages, you will need to change the above so that it uses a file that exists. You can add a file called `public-keys.js` to your repository, and put keys in there. Then, change keys.js to  public-keys.js (for example:)

        <script src="public-keys.js"></script>
        <script src="project.js"></script>
