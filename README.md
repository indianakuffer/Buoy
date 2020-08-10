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

**Buoy** is a social app in which users journal their thoughts and anonymously cast them out to 'sea' for others to view. Users can choose the color of their thought to represent how they're feeling, and give their thought any helpful tags. While at sea, a user can watch the anonymous thoughts of others drift by based on color, tag, or location. Buoy aims to remove showmanship and clout from social media while encouraging users to be empathetic and open about their emotions.

<br>

## MVP

The **Buoy** MVP will provide frontend user account creation, deletion, and updating. Users will be able to write, view, and delete thoughts, with a separate screen for viewing the thoughts of others. User account information, thoughts, colors, and tags will be stored on a Ruby on Rails backend.

<br>

### Goals

- _Ruby on Rails backend for storing user info, thought info, colors, tags, and likes._
- _Frontend user account management (full CRUD)._
- _User can create, customize, and delete thoughts (CRD)._
- _Screen showing thoughts of other users._

<br>

### Challenges

- _Buoy's data requires more complex relationships than I've made before._
- _Creating a strong visual design._
- _Implementing location for thoughts, and filtering sea of thoughts based on user location._

<br>

### Libraries and Dependencies


|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      Rails       | Web app framework used for the restful API backend. |
|      Rack-Cors   | Cross-Origin Resource Sharing support for Rails. |
|      Pry-Rails   | Replace Rails console default IRB with Pry. |
|      React       | Frontend framework. |
|      Axios       | Promise based HTTP client for the browser and Node.js. |
|   React Router   | Routing for frontend. |
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

[Full Album](https://imgur.com/a/gxED2hg)

<br>

#### Component Tree

![Component Tree](https://i.imgur.com/JbbhmlY.png)
> Dashed lines indicate shared components

<br>

#### Component Hierarchy


``` structure

src
|__ App.jsx
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
      |__ SearchBar.jsx
      |__ shared/
            |__ Button.jsx
            |__ Input.jsx
            |__ ProfilePic.jsx
            |__ Popup.jsx
            |__ ThoughtListing.jsx
|__ services/
      |__ api-config.js
      |__ auth.js
      |__ users.js
      |__ thoughts.js
      |__ likes.js
      |__ tags.js
      |__ colors.js

```

<br>

#### Component Breakdown

> Use this section to go into further depth regarding your components, including breaking down the components as stateless or stateful, and considering the passing of data between those components.

|  Component   |    Type    | state | props | Description                                                      |
| :----------: | :--------: | :---: | :---: | :--------------------------------------------------------------- |
|    Header    | functional |   n   |   n   | _The header will contain the navigation and logo._               |
|  Navigation  | functional |   n   |   n   | _The navigation will provide a link to each of the pages._       |
|   Gallery    |   class    |   y   |   n   | _The gallery will render the posts using cards in flexbox._      |
| Gallery Card | functional |   n   |   y   | _The cards will render the post info via props._                 |
|    Footer    | functional |   n   |   n   | _The footer will show info about me and a link to my portfolio._ |

<br>

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

***

## Post-MVP

> Ideas I've had that would be fun (or necessary) for my Post-MVP.

- Custom user icons to select from.
- Email verification.
- Forgot password feature.

***

## Code Showcase

> A brief code snippet of functionality that I'm proud of and a brief description.

## Code Issues & Resolutions

> A of all major issues encountered and their resolution.
