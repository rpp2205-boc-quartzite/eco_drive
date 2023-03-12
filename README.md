# eco_drive
## Mobile app enabling people commuting to a similar location to carpool together
A mobile app that connects carpoolers to save the earth by reducing carbon emissions and traffic congestion. It allows users to find and join carpools with individuals who have a similar commute, providing a convenient and eco-friendly way to get to work or school.
<p align="center">
  <img src="https://user-images.githubusercontent.com/103070104/218429330-babc6bde-d4e5-4867-85b9-c8d75dbecdc4.png" />
</p>
<br/>

https://user-images.githubusercontent.com/103070104/222848316-8e56c10d-824a-48f8-9132-59ad76b2adf2.mp4

## Contributors
[@wulfmatik](https://github.com/wulfmatik)  |  [@bbissing](https://github.com/bbissing)  |  [@chelseapae](https://github.com/chelseapae)  |  [@huantran123](https://github.com/huantran123)  |  [@camjhirsh](https://github.com/camjhirsh)  |  [@netbek932](https://github.com/netbek932)  |  [@romanlaughs](https://github.com/romanlaughs)

* Sign-up / Login Authentication - Blake
  - Sign-up View
User has ability to sign in using gmail account
User has the ability to select role including (driver, rider, or both)
Sign-up form includes fields for name, email, password, and DL#
Form requires age verification of 21+
A TOS confirmation
  - Login View
User will be prompted to provide login credentials that will be authenticated
If no profile matching credentials is found, suggest to the user to retry login or sign up.
If user has forgotten password, a reset password option will be given
User has ability to change password via user profile settings

* Default View - Home - Rebecca
  - Rider View
Upon completed authentication whether login / signup:
Contains fields for start destination, end destination, and start time
Allows user to set default routes, which will be visible and selectable from this view
Contains a logout button
Allows users to switch between rider and driver views. If a user toggles to a view that they did not sign up for, it will switch and they will just have to fill in the information for the selected view. If they toggle the driver view and did not initially select it, they will be prompted to add their license number. 
Shows upcoming trips, including start/end times, as well as driver information
Top right corner has an icon for the user's profile that when clicked, navigates to their profile.
Default Route - If a route has been selected as default, this section will display that route. Only one default route allowed per driver.
If the user chose both rider and driver upon login/signup, a toggle button will appear at the top left of the screen on the default page to allow the user to switch to the other option.
  - Driver View
Similar to rider view, however, allows for a field indicating number of available passenger seats which will determine how many riders will be assigned to that driver.
* Rider / Driver Trip Views & Interactions - Cameron, Nick, Huan
  - Rider View Interactions (Huan)
When selecting drivers, riders are presented with a list of available drivers along with the drivers profile
Riders are assigned to drivers based on location proximity to start/end points as well as number of available seats.
When a rider selects a driver, they are presented with a confirmation alert and that trip is saved to their home view where they can then review the trip/cancel trip/update trip.
Riders have the ability to view previous routes.
  - Driver View Interactions (Nick)
Drivers have the ability to save a default route and view previous routes, the same as a rider.
When a driver begins a trip, they will be presented with a list of nearby riders based on the number of available passenger seats. 
Drivers have the ability to decline assigned riders prior to confirmation. That rider will then be replaced in the list with another nearby rider – ensuring full capacity is maintained.
  - Both Views Interactions  (Cameron)
Once riders or drivers have been booked, each rider or driver is able to "Start Trip" once they have begin their trip. Once started, the user can "End Trip" and the trip will be archived. The user will be presented with a ‘Trip Completed’ notification that contains a brief trip analytic regarding money saved on the trip. They will be able to favorite fellow rider/drivers and link out to leave a review for the driver / riders.
These above analytics will also be compiled and totaled, to be viewed in the user profile page.
* Current User Profile & Analytics - Chelsea
  - The user profile contains the user’s picture as well as their personal account information. Their information can be edited and updated at user discretion. The user profile can be toggled between rider and driver information, including driver or rider reviews being separated in this way.
  - Other components of the user profile include a list of recent drivers or riders, any route listings, as well as previous trips as either a rider or driver. In terms of analytics, users will also be able to view the total money saved by ridesharing, as well as the environmental impact as a result of carpooling. 
* Ratings & Reviews - Brandon
  - Riders and drivers have the ability to leave reviews via a review form that is made available at the end of a ride.
If a user chooses to leave a review at a later date, they can access that review form by clicking on the list of previous riders/drivers and following an option to complete the review form via that other person’s profile listing.
Users can only leave reviews for others that they have ridden with previously. 
Reviews include a 5-star rating, calculated to the nearest half-point. In addition, they can write a full review via the text box on the form.

## Tech stack
|Front End | HTML | CSS | React | axios |
|Back End | Node.js | Express.js | MongoDB |
|APIs | Google Maps API | Unsplash API |
|Dev Tools | Webpack | Babel | VS Code | Git/Github |
|Testing | Jest |
|Deployment | AWS |
<table>
  <tr>
    <td><b>Frontend</b></td>
    <td>HTML</td>
    <td>CSS</td>
    <td>React</td>
    <td>Axios</td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>Node.js</td>
    <td>Express.js</td>
    <td>MongoDB</td>
    <td></td>
  </tr>
  <tr>
    <td><b>APIs</b></td>
    <td>Google Maps API</td>
    <td>Unsplash API</td>
    <td></td>
  </tr>
  <tr>
    <td><b>Dev Tools</b></td>
    <td>Webpack</td>
    <td>Babel</td>
    <td>VS Code</td>
    <td>Git/Github</td>
   </tr>
  <tr>
    <td><b>Testing + Deployment</b></td>
    <td>Jest Testing</td>
    <td>AWS</td>
    <td></td>
    <td></td>
  </tr>
</table>

## Technical Challenges
*  Have a better separation of sub-components
*  Avoid unnecessary overuse of classNames for CSS impacting performance
*  Take the time to optimize or develop microservices

## Video Demo / Screen shot walkthrough of the app


## How does the app work?
See the Figma [here.](https://www.figma.com/proto/HEWbDkuO29mAwlEXWmwR8c/EcoDrive?page-id=0%3A1&node-id=3%3A7&viewport=-1612%2C346%2C1.03&scaling=scale-down&starting-point-node-id=3%3A7)

## What research was required?
* Research into working with the Google API
* Different tech stacks that align with our goals

## Workflow and Key lessons
* Maintain better communication around managing .env files
* Focus on security
* Don’t commit passwords and API keys to repo

## Next Iteration
- Get Directions
- Multilingual Support
- User Chat
- 2-factor authentication
- Financial Incentive framework and supporting infrastructure (Venmo integration)
- Dark mode
- Actual ToS
- Driver License verification
- Background check
- User Selfie photos

