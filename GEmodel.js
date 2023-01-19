Green Earth database

collection: users:

document:
{
  _id:          1
  full_name:    "Cameron Hirsh",
  email:        "camjhirsh@gmail.com",
  password:     "iLoveJS",
  is_driver:    true,
  is_rider:     true,
  driver_routes: [
    {
      start_address:  "123 MyLane",
      end_address:    "456 WorkPlace",
      time:           "7:00 AM Jan 2",
      open_seats:     4
    }
  ],
  rider_routes: [
    {
      start_address:  "123 MyLane",
      end_address:    "789 GymArea",
      timestamp:      "6:00 PM Jan 2"
    }
  ],
  driver_trips: [
    {
      start_address:      "123 MyLane",
      end_address:        "456 WorkPlace",
      number_passengers:  4,
      timestamp:          "7:00 AM Jan 3"
    },
    {
      start_address:      "123 MyLane",
      end_address:        "456 WorkPlace",
      number_passengers:  3,
      timestamp:          "7:00 AM Jan 3"
    }
  ],
  rider_trips: [
    {
      start_address:  "123 MyLane",
      end_address:    "789 GymArea",
      timestamp:      "6:00 PM Jan 2"
    },
    {
      start_address:  "123 MyLane",
      end_address:    "789 GymArea",
      timestamp:      "6:00 PM Jan 3"
    }
  ],
  reviews: [
    {
      reviewer_user_id:   2,
      rating:             1,
      review_text:        "Cameron is the worst driver I have ever had the displeasure to ride with"
    },
    {
      reviewer_user_id:   2,
      rating:             3,
      review_text:        "But he's ok sometimes maybe"
    }
  ]
}

document:
{
  _id: 2,
  full_name:    "Blake Crawford",
  email:        "BeeKeeperBlake@gmail.com",
  password:     "heLovesJS",
  is_driver:    true,
  is_rider:     true,
  driver_routes: [
  ],
  rider_routes: [
  ],
  driver_trips: [
    {
      start_address:      "123 MyLane",
      end_address:        "456 WorkPlace",
      number_passengers:  4,
      timestamp:          "7:00 AM Jan 3"
    }
  ],
  rider_trips: [
    {
      start_address:  "123 MyLane",
      end_address:    "789 GymArea",
      timestamp:      "6:00 PM Jan 2"
    }
  ],
  reviews: [
    {
      reviewer_user_id:   1,
      rating:             5,
      review_text:        "Blake legit drove the car with his eyes closed- he's Chat GTP for driving"
    }
  ]
}
