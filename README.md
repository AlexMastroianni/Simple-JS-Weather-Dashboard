# Weather Dashboard




# The App

### Overview

This weeks challenge was to build weather dashboard for travellers looking to check the weather of a city

### Function

#### Weather Dashboard

User is greeted with a simple dashboard with a search bar, a current day tile and 3 forcast tile. After the user searches for a city the files render weather infomation from the requested city. This incluses Temp, wind, UV, and will show an icon for a weather represetation, The UV range will be indicated by a coloured background.  The dashboard will also show a 5 day future forcast. The user will be able to refesh the page and retain search history. The user will be able to clear the search list from the list.

![Weather (2)](https://user-images.githubusercontent.com/107826386/191727902-7c873fd1-3128-4545-8d29-6aff766b4070.gif)




#### Tech

This projects takes advantage of multiple third pary APIs. Using OpenWeatherAPI for all weather related components, Bulma.io for styling and Jquery for logic of the app.

#### Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```


## Links

[Github Repo](https://github.com/AlexMastroianni/week-6-challenge)

[Live Site](https://alexmastroianni.github.io/week-6-challenge/)
