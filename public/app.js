document.addEventListener("alpine:init", () => {

    Alpine.data('appData', () => {
        return {

            vehicles: [],
            latitude: 0,
            longitude: 0,
            currentVehicle: '',
            vehicleEmission: '',
            currentScore: '',
            myHistory: [],
            journeys: [],
            showSection1: false,
            showSection2: false,
            showSection3: false,
            showSection4: false,
            showSection5: false,
            showSection6: false,
            showSubSection1: false,
            showSubSection2: false,
            showSubSection3: false,
            showSubSection4: false,
            searchVehicle: '',
            currentDate: '',
            currentDayNumber: '',
            currentMonth: '',
            currentYear: '',
            reformattedDate: '',
            make: '',
            model: '',
            myVehicles: [],
            signedIn: 0,
            username: '',
            password: '',
            searchResult_alpine: [],
            cylinders: '',
            users: [],
            vehicleSelection: '',
            resultsPerPage: 0,
            historyTotals: [],
            showHistorySection1: false,
            distanceTraveled: 0,
            taxResult: 0,
            carSelection: '',
            position: '',
            geoLoc: '',
            watchID: '',
            currentCoordinates: [],
            registrationNumber: '',
            currentDatePick: '',
            flatpickrInstance: null,
            fuelType: '',
            vehicleSelectionTax: '',
            distanceEntered: '',
            combinedFuelConsumption: '',
            engineSize: '',
            makeAlpine: '',
            modelAlpine: '',
            selectedVehicleTax: '',
            predictedEmissions: '',



            init() {
                currentDate = new Date();
                console.log(currentDate);
                this.currentDayNumber = currentDate.getDate();
                console.log(this.currentDayNumber);
                this.currentMonth = currentDate.getMonth() + 1;
                console.log(this.currentMonth);
                this.currentYear = currentDate.getFullYear();
                console.log(this.currentYear);
                this.reformattedDate = `${this.currentDayNumber}${this.currentMonth}${this.currentYear}`;
                console.log('Date = ' + this.reformattedDate);
                initialPosition = 0;
                //this.viewHistory(10);
                //this.getLocationUpdate();
                this.createMap();

                console.log('initial position : ' + this.latitude);
                console.log('Login-status: ' + this.signedIn);
                axios
                    .get('/api/getcurrentvehicle/')
                    .then(result => {
                        this.plans = result.data.plans;
                        console.log(result.data)
                        console.log(result.data.plans)

                    });


            },







            createMap(currentCoordinates) {
                //var map = L.map('map').setView(this.currentCoordinates, 13);
                var map = L.map('map').setView([51.505, -0.09], 35); //map container dictates zoomlevel
                var counter = 0;
                let locationMarker = L.marker([51.505, -0.09]).addTo(map);

                const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 15,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                map.on('locationfound', updateLocation);

                /*function onLocationFound(e) {
                    const radius = e.accuracy / 2;

                    //var marker = L.marker([this.currentCoordinates]).addTo(map)
                    var locationMarker = L.marker(e.latlng).addTo(map)

                        .bindPopup(`Starting Point ` + counter).openPopup();
                    console.log('location: ' + e.latlng) //this works
                    currentCoordinates.push(e.latlng);
                    console.log(currentCoordinates[counter]);
                    console.log('latitude: ' + e.latlng.lat) //this works too
                    console.log('longitude: ' + e.latlng.lng) //even this
                    console.log('both: ' + e.latlng.latlng) //doesn't work

                    //const locationCircle = L.circle(e.latlng, radius).addTo(map);

                }

                function onLocationError(e) {
                    alert(e.message);
                }*/

                function updateLocation() {
                    var watchID= navigator.geolocation.watchPosition(function (position) {
                        //getPosition seems more controlled and orderly
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;
                        var intervalMessage = ``;

                        if (counter ==0) {
                            intervalMessage = `Starting Point `;
                        }

                        else if (counter > 0 || counter < 5){
                            intervalMessage = `Waypoint `;
                        }
                        else intervalMessage = `End Point ` 

                        // Update the marker location
                        locationMarker.setLatLng([latitude, longitude]).update()
                        .bindPopup(intervalMessage  + counter).openPopup();

                        // Pan the map to the new location
                        map.panTo([latitude, longitude], 20 );
                        console.log([latitude, longitude]);
                        counter++;

                        if (counter >= 5) {
                            clearInterval(intervalID);
                            navigator.geolocation.clearWatch(watchID);
                            alert('interval cleared!');
                            intervalMessage = `End Point `;
                            locationMarker.setLatLng([latitude, longitude]).update()
                        .bindPopup(intervalMessage).openPopup();p
                        }
                    });
                }

                // Call the updateLocation function every 10 seconds
                var intervalID =setInterval(updateLocation, 10000);

                //map.on('locationfound', updateLocation);
                //map.on('locationerror', onLocationError);

                //map.locate({ setView: true, Zoom: 15 });
                //map = L.map('map').setView(e.latlng, 13);

                /*
                this.getLocationUpdate();
                console.log(this.latitude);
                var map = L.map('map').locate({setView: true, maxZoom: 16});//L.map('map').setView([this.latitude, this.longitude], 14);
                mapLink =
                  '<a href="http://openstreetmap.org">OpenStreetMap</a>';
                  map.on('locationfound', this.onLocationFound);
                L.tileLayer(
                  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; ' + mapLink + ' Contributors',
                  maxZoom: 18,
                }).addTo(map);
                L.marker(e.latlng).addTo(map); */
            },




            startRoute() {
                this.getLocationUpdate();

                alert('Journey Started! lat: ' + this.latitude);



            },


            endRoute() {

                alert('Journey Ended!');
                var currentScore = Math.floor(Math.random() * 10);
                return axios
                    .post('/api/current_vehicle/add_journey', {
                        "date": `${reformattedDate}`,
                        "model": "DB9",
                        "registration": `${this.vehicleSelection}`,
                        "distance_traveled": `${this.distanceEntered}`,
                        "co2_emitted": 6338,
                        "calculated_tax": 26.51,
                        "currently_selected": 1, //can you call method here?
                        "score": currentScore

                    })
                //.then(result => { alert(`Journey Started!`); })
                //.then(result => { this.showCartData() })



            },






        }
    });



});