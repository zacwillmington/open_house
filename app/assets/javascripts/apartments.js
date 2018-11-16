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
    constructor(apartment) {
        this.id = apartment.id;
        this.address = apartment.address;
        this.availableTimes = apartment.available_times;
        this.image = apartment.image;
        this.bedrooms = apartment.bedrooms;
        this.bathrooms = apartment.bathrooms;
        this.parking = apartment.parking;
        this.price = apartment.price;
    }
}

Apartment.prototype.reformatDateTime = function() {
   const dateStr = moment(this.availableTimes).format('MMMM Do YYYY, h:mm a');
   return dateStr;
}

Apartment.prototype.isAttending = function() {
    const userId = User.getCurrentUserId();
    const included = (appointment) => {
        return appointment.user_id === userId;
    }
    return this.appointments.some(included);

}



function attachListenersApartments() {
    $('.js-get-all-apartments-btn').on('click', (e) => {
            e.preventDefault();
            getApartments(e.target.href);
    });

    $('#js-previous-apartment').on('click', (e) => {
        e.preventDefault();
        const apartmentId = $('.apartment-content').data('id');
        getApartmentForApartmentShow(apartmentId - 1);

    });

    $('#js-next-apartment').on('click', (e) => {
        e.preventDefault();
        const apartmentId = $('.apartment-content').data('id');
        getApartmentForApartmentShow(apartmentId + 1);

    });
}

function getApartmentForApartmentShow(url) {
    $.get(url + ".json").done( (data) => {
        addApartmentsToApartmentShow(data);
    });
}

function createApartment(apartment) {
    const apt = new Apartment(apartment);
    if (apartment.appointments){
        apt.appointments = createAppointments(apartment.appointments);
    }
    return apt;
}

function createApartments(apartments) {
    const apartmentsArray = [];
    apartments.forEach((apartment) => apartmentsArray.push(createApartment(apartment)));
    return apartmentsArray;
}

function getApartments(url) {
    $.get(url + ".json").done( (data) => {
        const apartments = createApartments(data);
        addApartmentsToUsersShow(apartments);
    });
}

function addApartmentsToUsersShow(apartments) {
    const h2Apartments = document.getElementById("apartments-title");
    $('#appointments-title-container h2').innerText = "";
    if (h2Apartments === null) {
        $('.apartment').remove();
        $('#apartment-contact-previous-next').remove();
        let allApartmentsDiv = $('.all-apartments');
        apartments.forEach( (apartment) => {
            const apartmentTemplate = document.getElementById('apartment-template').innerHTML;
            const templateFn = _.template(apartmentTemplate);
            const templateHTML = templateFn({
                id: apartment.id,
                url: apartment.image.url,
                address: apartment.address,
                bedrooms: apartment.bedrooms,
                bathrooms: apartment.bathrooms,
                parking: apartment.parking,
                price: apartment.price,
                attending: apartment.appointments.length - 1,
                showing: apartment.reformatDateTime.call(apartment),
                link: `/apartments/${apartment.id}`
             });
            allApartmentsDiv.append(templateHTML);
        });
            $(".all-apartments").prepend('<div id="apartments-title"><h2>Apartments</h2></div>');
    }
}

function addApartmentsToApartmentShow(apt) {
    let apartmentDiv = document.getElementById('apartment');
    const apartment = createApartment(apt);
    const apartmentTemplate = document.getElementById('apartment-show-template').innerHTML;
    const templateFn = _.template(apartmentTemplate);
    const templateHTML = templateFn({
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
    if( !Apartment.prototype.isAttending.call(apartment) ){
        $('.alert-success').remove();
    }else {
        $('a#make-appointment-btn').addClass('hidden');
    }
}
