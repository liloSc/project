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

//48.819185 | Longitude : 2.336768

const isNext = () => {
    var coordinateCite=[48.819185,2.336768]
    const status = document.querySelector('.place-status');
    const success = (position) => {
        console.log(position)
        // status.textContent=position
        const crd = position.coords;
        console.log(`Latitude : ${crd.latitude}`);
        if ((crd.latitude < (coordinateCite[0] + 0.01) && crd.latitude > (coordinateCite[0]  - 0.01))&&(crd.longitude < (coordinateCite[1]  + 0.01) && crd.longitude > (coordinateCite[1]  - 0.01))){
      
      //  if ((crd.latitude < (48.819185 + 0.01) && crd.latitude > (48.819185 - 0.01))&&(crd.longitude < (2.336768 + 0.01) && crd.longitude > (2.336768 - 0.01))){
            status.textContent = "Next to CITE "+crd.latitude + " "+coordinateCite[0]+ crd.longitude+" "+coordinateCite[1]
        }else{
            status.textContent = "NOT !!! Next to CITE"
        }
           
    }
    const error = () => {
        status.textContent = "Unable to retrieve your location"
    }
    navigator.geolocation.getCurrentPosition(success, error);
}
document.querySelector('.find-street').addEventListener('click', isNext);
