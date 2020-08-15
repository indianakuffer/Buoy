# Buoy
[buoy.netlify.app](https://buoy.netlify.app/)

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

**Buoy** is a social app that encourages users to be empathetic and open about their emotions while removing the showmanship and clout present in many online spaces. Users journal their thoughts and anonymously cast them out to 'sea' for others to view. Users can choose the color of their thought to represent how they're feeling, and give their thought helpful tags. While at sea, a user can watch the anonymous thoughts of others drift by based on color, tag, or location.

<br>

## MVP

The **Buoy** MVP will provide frontend user account creation, deletion, and updating. Users will be able to write, view, and delete thoughts, with a separate screen for viewing the thoughts of others. User account information, thoughts, colors, and tags will be stored on a Ruby on Rails backend.

<br>

### Goals

- Ruby on Rails backend for storing user info, thought info, colors, tags, and likes.
- Frontend user account management (CRUD).
- User can create, customize, and delete thoughts (CRD).
- Screen showing thoughts of other users.

<br>

### Challenges

- Buoy's data requires more complex relationships than I've made before.
- Creating a strong visual design.
- Implementing location for thoughts, and filtering sea of thoughts based on user location.

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
|     d3-ease      | Easing curves for animation tweaking. |

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

![Component Tree](https://i.imgur.com/OT8BbAw.png)
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

> _All components are functional components._

|    Component    | state | props | Description                                                      |
|  :----------:   | :---: | :---: | :--------------------------------------------------------------- |
| App             |   y   |   n   | _Renders the Header and handles routing. Keeps state for UserInfo and UserThoughts._|
| Landing         |   n   |   y   | _Splash page pre-login/registration. Does not show if site visited with valid JWT._|
| Login           |   y   |   y   | _Form for logging in. Redirects to Sea upon successful login._|
| Register        |   y   |   y   | _Form for registration. Redirects to CreateThought on successful registration._|
| AccountDetails  |   n   |   y   | _Shows basic account info with link to AccountEdit and button for account deletion._|
| AccountEdit     |   y   |   y   | _Form for updating account info._|
| CreateThought   |   y   |   y   | _Form for creating new thoughts. Adds to UserThoughts state of App._|
| Thoughts        |   n   |   y   | _Shows reverse-chronological list of user's thoughts. Ability to delete thoughts. Pulls info from UserThoughts state of App._|
| Sea             |   y   |   y   | _Shows a feed of user thoughts, filterable by color, location, and tag._|
| Header          |   n   |   y   | _Header renders Nav, NavMenu, and SearchBar when needed._|
| Nav             |   y   |   y   | _Render user icon and login/register/logout links.._|
| NavMenu         |   n   |   y   | _Links for navigating Buoy._|
| Button          |   n   |   y   | _Shared button with props for onClick, Link, color, content, etc._|
| Input           |   n   |   y   | _Shared input with props for name, type, placeholder, etc._|
| ProfilePic      |   n   |   y   | _Shared icon displays user icon from UserInfo state of App._|
| Popup           |   n   |   y   | _Shared popup for user alerts with props for content, color, button, etc._|
| ThoughtListing  |   n   |   y   | _Shared component for showing a thought with props for thought content, info, etc._|

<br>

#### Time Estimates

| Task                        | Priority | Estimated Time | Time Invested | Actual Time |
| --------------------------- | :------: | :------------: | :-----------: | :---------: |
| **Backend**                                                                           |
| Initialize Rails            |    H     |     0.5 hrs    |     0.25 hrs     |     TBD     |
| Install Dependencies        |    H     |     0.5 hrs    |     0.25 hrs     |     TBD     |
| Scaffold Tables             |    H     |     0.5 hrs    |     0.25 hrs     |     TBD     |
| Assign References           |    H     |     0.5 hrs    |     0.25 hrs     |     TBD     |
| Assign Validations          |    H     |     0.5 hrs    |     0.25 hrs     |     TBD     |
| Set Up Auth                 |    H     |     1.0 hrs    |     0.25 hrs     |     TBD     |
| Set Up Routes               |    H     |     0.5 hrs    |     1.0 hrs      |     TBD     |
| Configure Controllers       |    H     |     0.5 hrs    |     1.0 hrs      |     TBD     |
| Rails Testing / Fixes       |    M     |     2.0 hrs    |     1.0 hrs      |     TBD     |
| **Frontend**                                                                             |
| Initialize React App        |    H     |     0.5 hrs    |     0.12 hrs     |     TBD     |
| Install Dependencies        |    H     |     0.5 hrs    |     0.12 hrs     |     TBD     |
| Remove React Fluff          |    L     |     0.5 hrs    |     0.12 hrs     |     TBD     |
| Set Up File Directory       |    H     |     0.5 hrs    |     0.12 hrs     |     TBD     |
| Set Up Screen Routing       |    H     |     0.5 hrs    |     0.12 hrs     |     TBD     |
| Set Up Services and Auth    |    H     |     1.0 hrs    |     0.5 hrs      |     TBD     |
| Set Up Component Shells     |    H     |     3.0 hrs    |     0.12 hrs     |     TBD     |
| Initial Styling             |    M     |     3.0 hrs    |     3.25 hrs      |     TBD     |
| Shared Comps                |    M     |     6.0 hrs    |     4.5 hrs      |     TBD     |
| Login / Register Comps      |    H     |     2.0 hrs    |     1 hrs        |     TBD     |
| AccountDetails / Edit Comps |    H     |     2.0 hrs    |     1.5 hrs      |     TBD     |
| CreateThought Comp          |    H     |     2.0 hrs    |     1.5 hrs      |     TBD     |
| Thoughts Comp               |    H     |     2.0 hrs    |     1.5 hrs      |     TBD     |
| Sea Comp                    |    H     |     4.0 hrs    |     3.5 hrs      |     TBD     |
| Advanced / Mobile Styling   |    H     |     8.0 hrs    |     3.5 hrs      |     TBD     |
| Extra                       |    H     |     5.0 hrs    |     0 hrs        |     TBD     |
| TOTAL                       |          |    47.0 hrs    |     26.25 hrs     |     TBD     |

<br>

### Server (Back End)

#### ERD Model

![Buoy ERD](https://i.imgur.com/7d95EQG.png)

<br>

#### API Endpoint Documentation

```
/users - index, post
/users/:id - show, put, destroy
/thoughts - index, post
  queries: color, tag
/thoughts/:id - show, destroy
/colors - index, post
/colors/:id - show, put, destroy
/tags - index, post
/tags/:id - show, put, destroy
/likes - index, post
/likes/:id - show, destroy
/profile_pics - index
/profile_pics/:id - show
```

***

## Post-MVP

- Plug for github and portfolio.
- Screen transitions.
- Background animations.
- Loading indicator.
- Sea gentle auto-scroll, user can rewind or fast-forward.
- Thoughts searchable by content in addition to tags.
- Thought location storing and filtering.
- Email verification.
- Forgot password feature.

***

## Code Showcase

> Coming soon.

## Code Issues & Resolutions

> A of all major issues encountered and their resolution.
