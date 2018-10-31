$( document ).ready( () => attachListenersApartments());

// Change Lodash template interpolation characters from <%- foo %> to mustache style {{= foo }}. Erb syntax interferes with lodash.
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

class Apartment {
    constructor(id, address, available_times, image, bedrooms, bathrooms, parking, price) {
        self.id = id;
        self.address = address;
        self.availableTimes = available_times;
        self.image = image;
        self.bedrooms = bedrooms;
        self.bathrooms = bathrooms;
        self.parking = parking;
        self.price = price;
    }

    // Is this prototype method?
    reformatDateTime() {
        let dateStr = moment(this.availableTimes).format('MMMM Do YYYY, h:mm a');
        return dateStr;
    }
}

function attachListenersApartments() {
    $('.js-get-all-apartments-btn').on('click', (e) => {
        e.preventDefault();
         getApartments(e);
    });

    $('.js-view-apartment').on('click', (e) => {
        e.preventDefault();
        getApartment(e.currentTarget.href);
    });
}

function getApartment(url) {
    let newApartment;
    $.get(`${url}`, (data) => {
        newApartment = createApartment(data);
        addApartmentsToAppointmentsIndex(newApartment);
    });
    return newApartment;
}

function createApartment(apartment) {
    apt = new Apartment;
    apt.id = apartment.id;
    apt.address = apartment.address;
    apt.availableTimes = apartment.available_times;
    apt.image = apartment.image;
    apt.bedrooms = apartment.bedrooms;
    apt.bathrooms = apartment.bathrooms;
    apt.parking = apartment.parking;
    apt.price = apartment.price;
    apt.appointments = createAppointments(apartment.appointments);
    return apt;
}

function addApartmentsToAppointmentsIndex(apartment) {
    let div = $(`[data-id="${apartment.id}"]`);
    if (div.length === 1) {
        let apartmentTemplate = document.getElementById('apartment-template').innerHTML;

        let templateFn = _.template(apartmentTemplate);
        let templateHTML = templateFn({ id: apartment.id, url: apartment.image.url ,address: apartment.address, attending: apartment.appointments.length - 1, showing: apartment.reformatDateTime(), link: `/apartments/${apartment.id}` });
        div.append(templateHTML);
        let viewApartmentBtn = $('.js-view-apartment');
    }
}

function createApartments(apartments) {
    // Try mass assignment for cleaner code.
    let apartmentsArray = [];
    apartments.forEach( (apartment) => {
        apt = new Apartment;
        apt.id = apartment.id;
        apt.address = apartment.address;
        apt.availableTimes = apartment.available_times;
        apt.image = apartment.image;
        apt.bedrooms = apartment.bedrooms;
        apt.bathrooms = apartment.bathrooms;
        apt.parking = apartment.parking;
        apt.price = apartment.price;
        apt.appointments = createAppointments(apartment.appointments);
        apartmentsArray.push(apt);
    });
    return apartmentsArray;
}

function getApartments(e) {
    $.get(`${e.target.href}`).done( (data) => {
        let apartments = createApartments(data);
        addApartmentsToUsersShow(apartments);
    });
}

function addApartmentsToUsersShow(apartments) {
    let allApartmentsDiv = $('.all-apartments');
    apartments.forEach( (apartment) => {

        let apartmentTemplate = document.getElementById('apartment-template').innerHTML;

        let templateFn = _.template(apartmentTemplate);
        let templateHTML = templateFn({ id: apartment.id, url: apartment.image.url ,address: apartment.address, attending: apartment.appointments.length - 1, showing: apartment.reformatDateTime(), link: `/apartments/${apartment.id}` });
        allApartmentsDiv.append(templateHTML);
    });
}
