import { LOGOUT_URL, TOKEN } from '../../constants/api.path';

function Logout() {
    // console.log("Logging out...");
    fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
        }
    }).then(async response => {
        return response.json();
    }).then(result => {
        if(result) {
        alert(result.returnMessage);
        localStorage.clear();
        window.location.href = "/login";
        }
    })

}

export default Logout;