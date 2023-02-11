# eco_drive
## Mobile app enabling people commuting to a similar location to carpool together
A mobile app that connects carpoolers to save the earth by reducing carbon emissions and traffic congestion. It allows users to find and join carpools with individuals who have a similar commute, providing a convenient and eco-friendly way to get to work or school.

## Contributors
@wulfmatik
@bbissing
@chelseapae
@huantran123
@camjhirsh
@netbek932
@romanlaughs

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
Upon trip completion, users are presented with a ‘Trip Completed’ notification that contains information like money saved, earned, carbon footprint, as well as a link to leave a review for the driver / riders.
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
- React
- MongoDB
- Node.js
- Express
- Axios
- Webpack/Babel
- Google Maps API
- VS Code
- Git/Github
- Jest Testing
- AWS

## Technical Challenges and research that you anticipated
* Why, what was the plan to overcome those challenges?
* What did you learn?

## Challenges that were unexpected
* Why was it a challenge
* What did you learn?

## Video Demo / Screen shot walkthrough of the app
* What were the user stories /  what was MVP (mention Minimal Viable Product)

## How does the app work?
* What happens behind the scenes when the user interacts with it?
* OR What are all the places the data travels?  What happens to that data?
* Optionally include a diagram
* How does the tech stack come together?

## What research was required?

## Workflow and Key lessons from your team - specifically those related to: Agile, CI/CD, testing, working with external stakeholders, ticketing, and user stories.
* Your git workflow, style guides, commit guides, etc
* What did you learn from the process
* What were key takeaways from stand ups, code reviews, etc
* Writing tests
* Link to your project board, discuss completed tickets

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

