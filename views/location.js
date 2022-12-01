const findLocation = () => {
    const status = document.querySelector('.status');
    const success = (position) => {
        console.log(position)
        // status.textContent=position
        const crd = position.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        status.textContent = "Latitude: " + crd.latitude + " Longitude: " + crd.longitude
    }
    const error = () => {
        status.textContent = "Unable to retrieve your location"
    }
    navigator.geolocation.getCurrentPosition(success, error);
}
document.querySelector('.find-state').addEventListener('click', findLocation);