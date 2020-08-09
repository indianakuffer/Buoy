# Buoy

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Challenges](#challenges)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Breakdown](#component-breakdown)
    - [Time Estimates](#time-estimates)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

## Overview

**Buoy** is a social app in which users can journal their thoughts and cast them out to 'sea'. Users are able to customize the color of their thought, or add a tag. While at sea, a user can watch the anonymous thoughts of others drift by based on location, color, or tag.


<br>

## MVP

> The Minimum Viable Product should be a well-planned, easily-communicated product, ensuring that the client's deliverable will be achievable and meet specifications within the time frame estimated.

The **Buoy** MVP will allow for user account creation, deletion, editing, and logging in. Users will be able to create thoughts, delete thoughts and view the thoughts of others. User account information, thoughts, colors, and tags will be stored on a Ruby on Rails backend.

<br>

### Goals

- _Ruby on Rails backend for storing user info and thought info._
- _User account management (CRUD)._
- _User can create, customize, and delete thoughts._
- _Screen showing thoughts of other users._

<br>

### Challenges

- _Buoy's data requires more complex relationships than I've made before._
- _Implementing location for thoughts, and filtering sea of thoughts based on user location._

<br>

### Libraries and Dependencies


|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      React       | Frontend framework. |
|   React Router   | Routing for frontend. |
|      Axios       | Promise based HTTP client for the browser and Node.js. |
|Styled Components | Styling management for React components.   |
|   React Spring   | Physics-based animation library for React. |

<br>

### Client (Front End)

#### Wireframes

<details>
<Summary>Full Wireframe</Summary>

![Buoy - Full](https://i.imgur.com/pgOf8US.png)
</details>

<details>
<Summary>Landing</Summary>

![Buoy - Landing](https://i.imgur.com/3ApTugn.png)
</details>

<details>
<Summary>Login</Summary>

![Buoy - Login](https://i.imgur.com/H5m3C4x.png)
</details>

<details>
<Summary>Register</Summary>

![Buoy - Register](https://i.imgur.com/medHXAE.png)
</details>

<details>
<Summary>Account Details</Summary>

![Buoy - Account Details](https://i.imgur.com/sHb87rB.png)
</details>

<details>
<Summary>Account Edit</Summary>

![Buoy - Account Edit](https://i.imgur.com/ugZ8cmo.png)
</details>

<details>
<Summary>Create Thought</Summary>

![Buoy - Create Thought](https://i.imgur.com/V5eGwfk.png)
</details>

<details>
<Summary>Thoughts</Summary>

![Buoy - Thoughts](https://i.imgur.com/EakPflI.png)
</details>

<details>
<Summary>Sea</Summary>

![Buoy - Sea](https://i.imgur.com/uyVMeXN.png)
</details>

#### Component Tree

> Use this section to display the structure of how your React components are being rendered. This should show the parent to child relation between you components. In other words, show which components are rendering the other components. 

#### Component Hierarchy


``` structure

src
|__ screens/
      |__ Landing.jsx
      |__ Login.jsx
      |__ Register.jsx
      |__ AccountDetails.jsx
      |__ AccountEdit.jsx
      |__ CreateThought.jsx
      |__ Thoughts.jsx
      |__ Sea.jsx
|__ components/
      |__ Header.jsx
      |__ Nav.jsx
      |__ NavMenu.jsx
      |__ ThoughtListing.jsx
      |__ SearchBar.jsx
      |__ shared/
            |__ Button.jsx
            |__ Input.jsx
            |__ ProfilePic.jsx
            |__ Popup.jsx
|__ services/
      |__ api-config.js
      |__ auth.js
      |__ users.js
      |__ thoughts.js
      |__ likes.js
      |__ tags.js
      |__ colors.js

```

#### Component Breakdown

> Use this section to go into further depth regarding your components, including breaking down the components as stateless or stateful, and considering the passing of data between those components.

|  Component   |    Type    | state | props | Description                                                      |
| :----------: | :--------: | :---: | :---: | :--------------------------------------------------------------- |
|    Header    | functional |   n   |   n   | _The header will contain the navigation and logo._               |
|  Navigation  | functional |   n   |   n   | _The navigation will provide a link to each of the pages._       |
|   Gallery    |   class    |   y   |   n   | _The gallery will render the posts using cards in flexbox._      |
| Gallery Card | functional |   n   |   y   | _The cards will render the post info via props._                 |
|    Footer    | functional |   n   |   n   | _The footer will show info about me and a link to my portfolio._ |

#### Time Estimates

> Use this section to estimate the time necessary to build out each of the components you've described above.

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Add Contact Form    |    L     |     3 hrs      |     2 hrs     |    3 hrs    |
| Create CRUD Actions |    H     |     3 hrs      |     1 hrs     |     TBD     |
| TOTAL               |          |     6 hrs      |     3 hrs     |     TBD     |

> _Why is this necessary? Time frames are key to the development cycle. You have limited time to code your app, and your estimates can then be used to evaluate possibilities of your MVP and post-MVP based on time needed. It's best you assume an additional hour for each component, as well as a few hours added to the total time, to play it safe._

<br>

### Server (Back End)

#### ERD Model

![Buoy ERD](https://i.imgur.com/7d95EQG.png)
<br>

***

## Post-MVP

> Ideas I've had that would be fun (or necessary) for my Post-MVP.

- Custom user icons to select from.
- Forgot password feature.

***

## Code Showcase

> A brief code snippet of functionality that I'm proud of and a brief description.

## Code Issues & Resolutions

> A of all major issues encountered and their resolution.
