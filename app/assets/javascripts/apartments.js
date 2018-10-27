$( document ).ready( () => attachListeners());

//ES6 classes
class Apartment {
    constructor(id, address, available_times, image, bedrooms, bathrooms, parking, price) {
        self.address = address;
        self.available_times = available_times;
        self.image = image;
        self.bedrooms = bedrooms;
        self.bathrooms = bathrooms;
        self.parking = parking;
        self.price = price;
    }
}

function attachListeners() {
    $('.js-get-all-apartments-btn').on('click', function(e) {
        e.preventDefault();
         getApartments(e);
    });
}

function getApartments(e) {
    $.get(`${e.target.href}`).done(function(data) {
        // ES6 create class for each apartment.
        data.forEach((apartment) => {
            apt = new Apartment;
            apt.id = apartment.id;
            apt.address = apartment.address;
            apt.available_times = apartment.available_times;
            apt.image = apartment.image;
            apt.bedrooms = apartment.bedrooms;
            apt.bathrooms = apartment.bathrooms;
            apt.parking = apartment.parking;
            apt.price = apartment.price;
            debugger;
            //push to where?
        });
        // addApartmentsToUsersShow(data);
    });
}

function addApartmentsToUsersShow(apartments) {

}
