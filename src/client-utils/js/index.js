const electron = require('electron');

const ipcRenderer = electron.ipcRenderer;

document.getElementById("signIn").addEventListener("click", function () {
    let name =  document.getElementById("LogUserName").value;
    let password = document.getElementById("LogPassword").value;

    if (name.length > 0 && password.length > 0) {
        fetch(`${Config.get_url()}/user/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: name,
                password: password
            })
        }).then(res => res.json()).then(data => {
            if (data.status !== "error") {
                ipcRenderer.send("login", {id: data.id, email: data.email, homeFolderName: data.homeFolderName, homeFolderID: data.homeFolderID, name: name, password: password});
            } else {
                throw new LoginInError("User does not exist please try again.")
            }
        });
    }else {
        throw new LoginInError("Please enter a valid username and password");
    }
});