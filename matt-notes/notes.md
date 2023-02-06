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


1. Clicking discover button calls OMDB function. DONE

2. OMDB function returns object, info from which should be displayed on the page (title, year, plot, poster) in generated div. DONE

3. Discover also calls youtube function. DONE

4. This function returns youtube object- including videoID DONE

5. Video ID from this function is stored in a variable that is inserted into iFrame video embed DONE
(lets start off with this a MVP). I want to use the API to retrieve the trailers and display them in a visually appealing way, such as in a grid or a carousel.

6. Make all this information appear presentable on the page. NOT YET. Delegate. 

7. Applies object keys as classes to generated p elements to apply styles in CSS. DONE 

8. Add a "to watchlist" button in div to get information saved to local storage, and to add to a separate watchlist. DONE

9. Add a "seen" button that adds the film to a "seen" list (again saving to local storage). DONE

10. Make it so that multiple films can be displayed when clicking search button- prepended to previous film. DONE

11. Create a "get a suggestion" button that will give the user a random film they can either add or move on from.

12. Create a rotten tomatoes section that shows whether the film is fresh or rotten.

13. Create a clear list function so that when movies are added to either list there are no repeat values. DONE

14. CSS styles on watch and seen list. 

15. Create a seen button on watch list elements so that they get moved to the seen list. DONE

16. Create a delete button on list elements to remove them from their respective lists. DONE

17. Make list elements draggable so that they can be re-ordered.

18. Get newly added divs so that they appear inside the discover div and they can be scrolled through. IF I CAN DO THIS TODAY I WILL BE A HAPPY BUNNY. DONE
I currenty have a container div with the ID movies-view.
Each film is generated in a div with the class 'discover' (appended to movies-view)
All other elements are appended to this dicover div.

When generating a discover with the search button, I also need to append a class 'active' to discover. DONE

19. Make it so that when removing items from lists also removes them from local storage. DONE

20. Make it so that clicking on the elements from the watch list or seen list gets their info back up on discover div. DONE

21. Make an info button so rather than clicking on the element to show information you need to click on a button. 

22. Make is so that clicking on a non-active discover div, generates the player in the div. DONE

23. Make the player div appear back in the discover div when clicking search button. DONE

24. Create a remove button on discover divs.

25. Change buttons so that they use font awesome icons.

26. Change JS so that click events trigger on icons and not buttons/seen list elements.

