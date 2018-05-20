owmjs
=======

A small Nodejs wrapper for some OpenWeatherMap APIs. For more information about the OpenWeatherMap and their APIs, please visit the [OpenWeatherMap](https://openweathermap.org/).

## Installation

`npm i owmjs --save`

## Covered OpenWeatherMap APIs

* [Current weather data](https://github.com/zuritor/jikanjs/blob/master/current-weather-data#)
* [forecast](https://github.com/zuritor/jikanjs/blob/master/readme.md#forecast)
* [UV Index ](https://github.com/zuritor/jikanjs/blob/master/readme.md#uv-index)

## Usage

```javascript
const owmjs  = require('owmjs');

// once imported you need to create the owmjs instance
const owmjsInstance = new owmjs("OpenWeatherMap apiKey", "unit format");
```

### Current weather data

To use the current weather module use

```javascript
owmjsInstance.current
```

#### ByCityName

| Parameter | Type | Description |
| --- | --- | --- |
| name | String | e.g. Cologne, London, New York, Tokyo |
| country | String | optional; ISO 3166 country codes. e.g. uk |

Example: 

```javascript
owmjsInstance.current.ByCityName("Cologne").then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ByCityID

| Parameter | Type | Description |
| --- | --- | --- |
| id | Number | visit http://bulk.openweathermap.org/sample/ for all city ids |

Example: 

```javascript
owmjsInstance.current.ByCityID(2172797).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ByGeographicCoordinates

| Parameter | Type | Description |
| --- | --- | --- |
| lat | Number | latitude |
| lon | Number | longitude |

Example: 

```javascript
owmjsInstance.current.ByGeographicCoordinates(35, 139).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ByZipCode

| Parameter | Type | Description |
| --- | --- | --- |
| zip | Number | |
| country | String | optional; ISO 3166 country codes. e.g. uk |

Example: 

```javascript
owmjsInstance.current.ByZipCode(94040).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ByRectangleZone

| Parameter | Type | Description |
| --- | --- | --- |
| lonleft | Number | longitude Left |
| latbottom | Number | latitude Bottom |
| lonright | Number | longitude Right |
| lattop | Number | latitude Top |
| zoom | Number | |
| cluster | String | optional |

Example: 

```javascript
owmjsInstance.current.ByRectangleZone(12,32,15,37,10).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ByCircle

| Parameter | Type | Description |
| --- | --- | --- |
| lat | Number | latitude |
| long | Number | longitude |
| cnt | Number | optional |
| cluster | String | optional |

Example: 

```javascript
owmjsInstance.current.ByCircle(55.5, 37.5).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### MultipleCity

| Parameter | Type | Description |
| --- | --- | --- |
| cities | Number[] | list of city ids |

Example: 

```javascript
owmjsInstance.current.MultipleCity([524901,703448,2643743]).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

### forecast

To use the forecast module use

```javascript
owmjsInstance.forecast
```

#### ByCityName

| Parameter | Type | Description |
| --- | --- | --- |
| name | String | e.g. Cologne, London, New York, Tokyo |
| country | String | optional; ISO 3166 country codes. e.g. uk |
| cnt | Number | optional; Number of days |

Example: 

```javascript
owmjsInstance.forecast.ByCityName('London', 'uk', 2).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ByCityID

| Parameter | Type | Description |
| --- | --- | --- |
| id | Number | visit http://bulk.openweathermap.org/sample/ for all city ids |
| cnt | Number | optional; Number of days |

Example: 

```javascript
owmjsInstance.forecast.ByCityID(2172797, 2).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ByGeographicCoordinates

| Parameter | Type | Description |
| --- | --- | --- |
| lat | Number | latitude |
| lon | Number | longitude |
| cnt | Number | optional; Number of days |

Example: 

```javascript
owmjsInstance.forecast.ByGeographicCoordinates(35, 139, 2).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ByZipCode

| Parameter | Type | Description |
| --- | --- | --- |
| zip | Number | |
| country | String | optional; ISO 3166 country codes. e.g. uk |
| cnt | Number | optional; Number of days |

Example: 

```javascript
owmjsInstance.forecast.ByZipCode(94040, 'us', 2).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

### UV Index

To use the UV Index module use

```javascript
owmjsInstance.uv
```

#### CurrentByGeographicCoordinates

Gives the current UV Index of the given Geographic Coordinates back

| Parameter | Type | Description |
| --- | --- | --- |
| lat | Number | latitude |
| lon | Number | longitude |

Example: 

```javascript
owmjsInstance.uv.CurrentByGeographicCoordinates(37.75, -122.37).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### ForecastByGeographicCoordinates

Gives UV Index forecast of the given Geographic Coordinates back

| Parameter | Type | Description |
| --- | --- | --- |
| lat | Number | latitude |
| lon | Number | longitude |
| cnt | Number | optional; Number of days |

Example: 

```javascript
owmjsInstance.uv.ForecastByGeographicCoordinates(37.75, -122.37, 2).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

#### HistoricleByGeographicCoordinates

Gives historcle UV Index date of the given Geographic Coordinates back

| Parameter | Type | Description |
| --- | --- | --- |
| lat | Number | latitude |
| lon | Number | longitude |
| start | Number | start point as Unix Time |
| end | Number | end point as Unix Time |
| cnt | Number | optional; Number of days |

Example: 

```javascript
owmjsInstance.uv.HistoricleByGeographicCoordinates(37.75, -122.37, 1498049953, 1498481991, 2).then(function (data) {
    // do stuff here
}).catch(function (err) {
    // handle error
});
```

More information related to the OpenWeatherMap APIs can be seen [here](https://openweathermap.org/api)