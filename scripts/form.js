var tableproperties = {
        "tablename": "table",
        "headerdefault": "id",
        "header": [{
            "name": "id",
            "order": ""
        }, {
            "name": "name",
            "order": ""
        }, {
            "name": "email",
            "order": ""
        }],
        "limitrows": 5
    },
    tablelistproperties = {
        "tablename": "tablelist",
        "headerdefault": "id",
        "header": [{
            "name": "id",
            "order": ""
        }, {
            "name": "name",
            "order": ""
        }, {
            "name": "email",
            "order": ""
        }],
        "start": 0,
        "limitrows": 5,
        "page": 1
    }

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

var contact = contactjson,
    contactlist = contactlistjson;

function searchItems(str, elmname) {
    var result = [];
    if (elmname === 'searchhome') {
        contact.filter((el) => {
            if (el.name.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
                el.email.toLowerCase().indexOf(str.toLowerCase()) > -1) {
                //console.log(el + '_' + str);
                result.push(el);
                //console.log(result);
            }
        });
        (document.getElementsByName(elmname)[0].value == '') ? contact = contactjson: contact = result;
        setContactEntry(contact);
    } else if (elmname === 'searchlist') {
        contactlist.filter((el) => {
            if (el.name.toLowerCase().indexOf(str.toLowerCase()) > -1 ||
                el.email.toLowerCase().indexOf(str.toLowerCase()) > -1) {
                //console.log(el + '_' + str);
                result.push(el);
                //console.log(result);
            }
        });
        (document.getElementsByName(elmname)[0].value == '') ? contactlist = contactlistjson: contactlist = result;
        setContactList(contactlist);
    }

}

function sortItems(classname) {
    switch (classname) {
        case 'coltableid':
            //console.log(tableproperties['header']);
            tableproperties['header'].forEach(function(element, idx, larr) {
                //console.log(element)
                if (element.name == 'id') {
                    //console.log(element.name);
                    if (element.order == 'desc') {
                        element.order = 'asc';
                        setContactEntry(contact.sort((a, b) => {
                            return a.id - b.id;
                        }));
                    } else if (element.order == '' ||
                        element.order == 'asc') {
                        element.order = 'desc';
                        setContactEntry(contact.sort((a, b) => {
                            return b.id - a.id;
                        }));
                    }
                    tableproperties.headerdefault = element.name;
                };
            }, this);
            break;
        case 'coltablename':
            //console.log(tableproperties['header']);
            tableproperties['header'].forEach(function(element, idx, larr) {
                //console.log(element)
                if (element.name == 'name') {
                    //console.log(element.name);
                    if (element.order == 'desc') {
                        element.order = 'asc';
                        setContactEntry(contact.sort((a, b) => {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                                return -1;
                            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }));
                    } else if (element.order == '' ||
                        element.order == 'asc') {
                        element.order = 'desc';
                        setContactEntry(contact.sort((a, b) => {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                                return 1;
                            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }));
                    }
                    tableproperties.headerdefault = element.name;
                };
            }, this);
            break;
        case 'coltableemail':
            //console.log(tableproperties['header']);
            tableproperties['header'].forEach(function(element, idx, larr) {
                //console.log(element)
                if (element.name == 'email') {
                    //console.log(element.name);
                    if (element.order == 'desc') {
                        element.order = 'asc';
                        setContactEntry(contact.sort((a, b) => {
                            if (a.email.toLowerCase() < b.email.toLowerCase()) {
                                return -1;
                            } else if (a.email.toLowerCase() > b.email.toLowerCase()) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }));
                    } else if (element.order == '' ||
                        element.order == 'asc') {
                        element.order = 'desc';
                        setContactEntry(contact.sort((a, b) => {
                            if (a.email.toLowerCase() < b.email.toLowerCase()) {
                                return 1;
                            } else if (a.email.toLowerCase() > b.email.toLowerCase()) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }));
                    }
                    tableproperties.headerdefault = element.name;
                };
            }, this);
            break;
        case 'coltablelistid':
            //console.log(tablelistproperties['header']);
            tablelistproperties['header'].forEach(function(element, idx, larr) {
                //console.log(element)
                if (element.name == 'id') {
                    //console.log(element.name);
                    if (element.order == 'desc') {
                        element.order = 'asc';
                        setContactList(contactlist.sort((a, b) => {
                            return a.id - b.id;
                        }));
                    } else if (element.order == '' ||
                        element.order == 'asc') {
                        element.order = 'desc';
                        setContactList(contactlist.sort((a, b) => {
                            return b.id - a.id;
                        }));
                    }
                    tablelistproperties.headerdefault = element.name;
                };
            }, this);
            break;
        case 'coltablelistname':
            //console.log(tablelistproperties['header']);
            tablelistproperties['header'].forEach(function(element, idx, larr) {
                //console.log(element)
                if (element.name == 'name') {
                    //console.log(element.name);
                    if (element.order == 'desc') {
                        element.order = 'asc';
                        setContactList(contactlist.sort((a, b) => {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                                return -1;
                            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }));
                    } else if (element.order == '' ||
                        element.order == 'asc') {
                        element.order = 'desc';
                        setContactList(contactlist.sort((a, b) => {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                                return 1;
                            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }));
                    }
                    tablelistproperties.headerdefault = element.name;
                };
            }, this);
            break;
        case 'coltablelistemail':
            //console.log(tablelistproperties['header']);
            tablelistproperties['header'].forEach(function(element, idx, larr) {
                //console.log(element)
                if (element.name == 'email') {
                    //console.log(element.name);
                    if (element.order == 'desc') {
                        element.order = 'asc';
                        setContactList(contactlist.sort((a, b) => {
                            if (a.email.toLowerCase() < b.email.toLowerCase()) {
                                return -1;
                            } else if (a.email.toLowerCase() > b.email.toLowerCase()) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }));
                    } else if (element.order == '' ||
                        element.order == 'asc') {
                        element.order = 'desc';
                        setContactList(contactlist.sort((a, b) => {
                            if (a.email.toLowerCase() < b.email.toLowerCase()) {
                                return 1;
                            } else if (a.email.toLowerCase() > b.email.toLowerCase()) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }));
                    }
                    tablelistproperties.headerdefault = element.name;
                };
            }, this);
            break;
        default:
            break;
    }

}

function setContactEntry(contact) {
    //console.log(document.getElementsByClassName('table')[0]);
    var table = document.getElementsByClassName('table')[0];
    var rows = '<thead><tr><th class="coltableid" style="width:20px">ID</th><th class="coltablename" style="width:50%">Name</th><th class="coltableemail" style="width:50%">Email</th></tr ></thead >';

    if (contact && contact != '') {
        var limits = tableproperties.limitrows;
        var count = 0;
        contact.forEach((obj, idx, arr) => {
            if (limits > count) {
                rows = rows + `<tr><td>${obj.id}</td><td>${obj.name}</td><td>${obj.email}</td></tr>`;
                //console.log(rows);
                count++;
            }
        }, this);
    } else {
        rows = rows + `<tr><td colspan="3" align="center">No Data Found</td></tr>`;
    }
    table.innerHTML = rows;

    var tableid = document.getElementsByClassName('coltableid')[0];
    tableid.addEventListener('click', (evt) => {
        sortItems(evt.target.className);
    }, false);
    var tablename = document.getElementsByClassName('coltablename')[0];
    tablename.addEventListener('click', (evt) => {
        sortItems(evt.target.className);
    }, false);
    var tableemail = document.getElementsByClassName('coltableemail')[0];
    tableemail.addEventListener('click', (evt) => {
        sortItems(evt.target.className);
    }, false);
}

function setContactList(contactlist) {
    var table = document.getElementsByClassName('tablelist')[0];
    var rows = '<thead><tr><th class="coltablelistid" style="width:20px">ID</th><th class="coltablelistname" style="width:50%">Name</th><th class="coltablelistemail" style="width:50%">Email</th></tr ></thead >';
    setPaginationList(contactlist);

    if (contactlist && contactlist != '') {
        var limits = tablelistproperties.limitrows;
        var start = tablelistproperties.start;
        var count = 0;
        contactlist.forEach((obj, idx, arr) => {
            if (idx >= start) {
                if (limits > count) {
                    rows = rows + `<tr><td>${obj.id}</td><td>${obj.name}</td><td>${obj.email}</td></tr>`;
                    //console.log(rows);
                    count++;
                }
            }
        }, this);
    } else {
        rows = rows + `<tr><td colspan="3" align="center">No Data Found</td></tr>`;
    }
    table.innerHTML = rows;

    var tablelistid = document.getElementsByClassName('coltablelistid')[0];
    tablelistid.addEventListener('click', (evt) => {
        sortItems(evt.target.className);
    }, false);
    var tablelistname = document.getElementsByClassName('coltablelistname')[0];
    tablelistname.addEventListener('click', (evt) => {
        sortItems(evt.target.className);
    }, false);
    var tablelistemail = document.getElementsByClassName('coltablelistemail')[0];
    tablelistemail.addEventListener('click', (evt) => {
        sortItems(evt.target.className);
    }, false);
}

function setLimitList(limit, elmname) {
    if (elmname === 'limitrowshome') {
        tableproperties.limitrows = limit;
        setContactEntry(contact);
    } else if (elmname === 'limitrowslist') {
        tablelistproperties.limitrows = limit;
        setContactList(contactlist);
    }
}

function goPage(currPage) {
    var page = Math.ceil(contactlist.length / tablelistproperties.limitrows);
    if (currPage < 2) {
        tablelistproperties.start = 0;
        tablelistproperties.page = 1;
    } else if (currPage > 1) {
        tablelistproperties.start = tablelistproperties.limitrows * (currPage - 1);
        tablelistproperties.page = currPage;
    }
    setContactList(contactlist);
}

function setPaginationList(contactlist) {
    var pagination = document.querySelectorAll('.pagination');
    var page = Math.ceil(contactlist.length / tablelistproperties.limitrows);
    if (page == 1) {
        tablelistproperties.start = 0;
        tablelistproperties.page = 1;
    }
    pagination.forEach(function(element, idx, arr) {
        element.innerHTML = '<a href="javascript:void(0);" onclick="goPage(0);">&laquo;</a>';
        for (var i = 1; i <= page; i++) {
            if (i == tablelistproperties.page) {
                element.innerHTML = element.innerHTML + '<a href="javascript:void(0);" class="active" onclick="goPage(' + i + ');">' + i + '</a>';
            } else {
                element.innerHTML = element.innerHTML + '<a href="javascript:void(0);" onclick="goPage(' + i + ');">' + i + '</a>';
            }
        }
        element.innerHTML = element.innerHTML + '<a href="javascript:void(0);" onclick="goPage(' + page + ');">&raquo;</a>';

    }, this);
    //console.log(tablelistproperties.page + '_' + contactlist.length);
}

onload = function() {
    /** Menu tab link */
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

    /* Contact List*/
    setContactEntry(contact);
    setContactList(contactlist);

    /** table utils */
    var search = document.querySelectorAll('.search');
    search.forEach(function(element, idx, arr) {
        element.addEventListener('keyup', (evt) => {
            searchItems(evt.target.value, evt.target.name);
        }, false);
    }, this);

    var search = document.querySelectorAll('.limitrows');
    search.forEach(function(element, idx, arr) {
        element.addEventListener('change', (evt) => {
            setLimitList(evt.target.value, evt.target.name);
        }, false);
    }, this);

    setPaginationList(contactlist);
    sortItems('coltableid');
}