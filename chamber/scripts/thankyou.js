document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const myInfo = new URLSearchParams(window.location.search);

console.log(myInfo.get('firstName'));
console.log(myInfo.get('lastName'));
console.log(myInfo.get('organizationalTitle'));
console.log(myInfo.get('email'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('organization'));
console.log(myInfo.get('membership'));
console.log(myInfo.get('description'));
console.log(myInfo.get('timestamp'));


document.querySelector('#application-details').innerHTML = `
<h2>Application Details</h2>
<p>Application: ${myInfo.get('firstName')} ${myInfo.get('lastName')}</p>
<p>Organizational Title: ${myInfo.get('organizationalTitle')}</p>
<p>Email: ${myInfo.get('email')}</p>
<p>Phone: ${myInfo.get('phone')}</p>
<p>Business / Organization: ${myInfo.get('organization')}</p>
<p>Membership Level: ${myInfo.get('membership')}</p>
<p>Business / Organization Description: ${myInfo.get('description')}</p>
<p>Application Submitted: ${myInfo.get('timestamp')}</p>
`