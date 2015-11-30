
# Letz Local Activity Finder Project

This is the README markdown for Letz Local Activity Finder Project.

The primary service of Letz is to provide a real-time visual representation of other local people with similar interests and ages for a user-queried group activity. This markdown will provide full descriptive details about Letz, including which APIs will be utilized, technologies used (langauages, frameworks, packages, etc.), where the application is hosted online, etc.

### Contents

- Team Triple S
- Description of Letz
- Technologies/APIs used
- Hosting site

### Team Triple S

| Name               | Slack               | Email                    | GitHub      |
|--------------------|:-------------------:|:------------------------:|:-----------:|
| Sean Esteva        | @seangeleno         | seangeleno@gmail.com     | /seangeleno |
| Santiago Casar     | @santiagon          | santiago@nowhereprod.com | /sanjarito  |
| Seri Orfali        | @seriorfali         | seriorfali@gmail.com     | /seriorfali |

### Description of Letz

Letz will provide ONLY logged in users the ability to query the local vicinity on a map  via the Google API. If a user does not have a profile, they must CREATE one prior to using Letz's services. Upon a query of a valid location, the application will provide a map with a real-time visual representation of the current users within the area in a color coded fashion based on their level of compatibility. Two parameters are used to determine compatibility between users: age and desired activity. More specifically, it will simulate a traffic sign, green meaning they are compatible in both age and desired activity. Yellow means they only have one thing in common and red means neither criteria are compatible. <!-- Additional description of features, upon completion of application -->. Upon a valid match, in addition to providing the visual representation, there will be a chat feature, specifically built for this application, implemented using socket.IO and the MEAN technology stack.

Secondly, the Yelp API will be utilized to provide the logged in users with restaurant and business searches for the given city query.

There will be full CRUD functionality for users for their profiles. Users will be able to CREATE a user profile, and upon signing in, have the ability to READ their user info, UPDATE/edit their information, and DESTROY their user profile. If the user attempts to provide credentials and fails at authentication three times in a row, they will be forwarded to the CREATE user (sign-up) page.

The logged in user activities will be logged to a Mongo database. The object will include eight different activities to choose from <!--name 8 activities here -->

## Technologies/APIs Used

- APIs Used: Google Maps Yelp
- Languages/Technologies Used: MongoDB, Express, NodeJS, HTML, CSS
- Possible additional languages/technologies used: J5, Bootstrap, Sass

## Hosting Site

The current plan is to initiation Letz as a Git Repository and push the application to Heroku for public consumption.

## User Stories

Story 1 - The Stroller: I'm in Buenos Aires, Argentina and I'm feeling kind of cooped-up, I need some fresh air and a walk. However, I don't feel like being all by myself in a foreign land where I don't speak the language. Instead, the handy-dandy letz app allows me to find someone who also just want to go for a walk. We talk and arrange a meeting spot and voila!

Story 2 - The Amicable Hungry Person: I can't tell you how many times I've wanted to have somebody to have a meal with. Food goes so much better with a conversation and company, so, just match compatibility with someone close by and you guys can chat to your hearts content.

Story 3 - The Reveler: You're in Barcelona, Spain. It's New Years Eve and all you want to do is get loud and rowdy. Fortunately, there are several people within a 1/2 mile of you and they are all looking to do the same thing. You guys chat and decide on partaking in some awesome late night activity together.
