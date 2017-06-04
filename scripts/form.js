function openTab(evt) {
    var i, menutabcontent, tablinks, nodelinks;
    menutabcontent = document.getElementsByClassName('menutabcontent');
    for (i = 0; i < menutabcontent.length; i++) {
        menutabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace('active', '');
    }
    nodelinks = Array.prototype.slice.call(document.getElementsByClassName('tablinks'));
    //console.log(nodelinks.indexOf(evt.currentTarget));
    document.getElementsByClassName('menutabcontent')[nodelinks.indexOf(evt.currentTarget)].style.display = 'block';
    evt.currentTarget.className += 'active';
}

onload = function() {
    var menu = document.getElementsByClassName('menutab')[0];
    tablinks.forEach(function(button, idx, arr) {
        var menuButton = document.createElement('button');
        menuButton.className = tablinks[idx].class + ' ' + tablinks[idx].default;
        menuButton.textContent = tablinks[idx].txtShow;
        menuButton['onclick'] = (evt) => {
            // console.log(tablinks[idx].eventclick);
            openTab(evt);
        };
        menu.appendChild(menuButton);
    }, this);

    //console.log(document.getElementsByClassName('table')[0]);
    var table = document.getElementsByClassName('table')[0];
    var rows = '<thead><tr><th style="width:20px">ID</th><th style="width:50%">Name</th><th style="width:50%">Email</th></tr ></thead >';

    if (contact && contact != '') {
        contact.forEach((obj, idx, arr) => {
            rows = rows + `<tr><td>${obj.id}</td><td>${obj.name}</td><td>${obj.email}</td></tr>`;
            //console.log(rows);
        }, this);
    }
    table.innerHTML = rows;

    var table = document.getElementsByClassName('tablelist')[0];
    var rows = '<thead><tr><th style="width:20px">ID</th><th style="width:50%">Name</th><th style="width:50%">Email</th></tr ></thead >';

    if (contact && contact != '') {
        contact.forEach((obj, idx, arr) => {
            rows = rows + `<tr><td>${obj.id}</td><td>${obj.name}</td><td>${obj.email}</td></tr>`;
            //console.log(rows);
        }, this);
    }
    table.innerHTML = rows;
}