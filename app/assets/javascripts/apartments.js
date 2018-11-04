$(document).on("turbolinks:load", () => {
    attachListenersApartments();
    attachListenersAppointments();
});

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
}

Apartment.prototype.reformatDateTime = () => {
   let dateStr = moment(this.time).format('MMMM Do YYYY, h:mm a');
   return dateStr;
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

    $('#js-previous-apartment').on('click', (e) => {
        e.preventDefault();
        let apartmentId = $('.apartment-content').data('id');

         //if (Apartment.all.first.id != @apartment.id - 1){}
        getApartmentForApartmentShow(apartmentId - 1);
    });

    $('#js-next-apartment').on('click', (e) => {
        e.preventDefault();
        let apartmentId = $('.apartment-content').data('id');
        //if (Apartment.all.last.id !== apartmentId + 1) {
            getApartmentForApartmentShow(apartmentId + 1);
         // }
    });
}

function getApartment(url) {
    $.get(`${url}`).done( (data) => {
        let newApartment = createApartment(data);
        addApartmentsToAppointmentsIndex(newApartment);
    });
}

function getApartmentForApartmentShow(url) {
    $.get(`${url}`).done( (data) => {
        addApartmentsToApartmentShow(data);
    });
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
    if (apartment.appointments){
        apt.appointments = createAppointments(apartment.appointments);
    }
    return apt;
}
// may not need this---------->
function addApartmentsToAppointmentsIndex(apartment) {
    let div = $(`[data-id="${apartment.id}"]`);

    if (div.length === 1) {
        let apartmentTemplate = document.getElementById('apartment-template').innerHTML;
        let templateFn = _.template(apartmentTemplate);
        let templateHTML = templateFn({ id: apartment.id, url: apartment.image.url ,address: apartment.address, bedrooms: apartment.bedrooms, bathrooms: apartment.bathrooms, parking: apartment.parking, price: apartment.price, attending: apartment.appointments.length - 1, showing: apartment.reformatDateTime(), link: `/apartments/${apartment.id}` });
        div.append(templateHTML);
        let viewApartmentBtn = $('.js-view-apartment');
    }
}

function createApartments(apartments) {
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
    let h2Apartments = document.getElementById("apartments-title");
    if (h2Apartments === null) {
        let allApartmentsDiv = $('.all-apartments');

        apartments.forEach( (apartment) => {
            debugger;
            let apartmentTemplate = document.getElementById('apartment-template').innerHTML;
            let templateFn = _.template(apartmentTemplate);
            let templateHTML = templateFn({
                id: apartment.id,
                url: apartment.image.url,
                address: apartment.address,
                bedrooms: apartment.bedrooms,
                bathrooms: apartment.bathrooms,
                parking: apartment.parking,
                price: apartment.price,
                attending: apartment.appointments.length - 1,
                showing: apartment.reformatDateTime(),
                link: `/apartments/${apartment.id}`
             });
            allApartmentsDiv.append(templateHTML);
        });
            $(".all-apartments").prepend('<div id="apartments-title"><h2>Apartments</h2></div>');
    }
}

function addApartmentsToApartmentShow(apt) {
    let apartmentDiv = document.getElementById('apartment');
    let apartment = createApartment(apt);
    let apartmentTemplate = document.getElementById('apartment-template-apartments-show').innerHTML;
    let templateFn = _.template(apartmentTemplate);
    let templateHTML = templateFn({
        id: apartment.id,
        url: apartment.image.url,
        address: apartment.address,
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        parking: apartment.parking,
        price: apartment.price,
        attending: apartment.appointments.length - 1,
        showing: apartment.reformatDateTime(),
        link: `/apartments/${apartment.id}`
     });
    apartmentDiv.innerHTML = templateHTML;
}
