document.addEventListener('click', (e) => {
    const { target } = e;
    if(!target.matches('header a')) return;
    e.preventDefault();
    route();
})

const routes = {
    404 : {
        template: './templates/404.html', 
        title: 'Page Not Found | Routing Test'
    },
    '/': {
        template: './templates/index.html', 
        title: 'Home | Routing Test'
    },
    '/about': {
        template: './templates/about.html', 
        title: 'About Us | Routing Test'
    },
    '/contact': {
        template: './templates/contact.html', 
        title: 'Contact Us | Routing Test'
    } 
}

const route = (event) => {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState(null, null, event.target.href);
    locationHandler()
}

const locationHandler = async () => {
    let location = window.location.pathname;

    if (location.length === 0) {
        location = '/';
    }

    urlPath = routes[location] || routes[404];

    const html = await fetch(urlPath.template).then(res => res.text());
    
    document.querySelector('.maincontent').innerHTML = html;
    document.title = urlPath.title;
}

window.addEventListener('popstate', locationHandler);
locationHandler();