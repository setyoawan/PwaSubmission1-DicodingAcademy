document.addEventListener("DOMContentLoaded", function() {      

    const mobile = document.querySelectorAll('.sidenav');
    M.Sidenav.init(mobile);
    navigate();      

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);
    
    function loadPage(page) {
      const req = new XMLHttpRequest();
      req.onreadystatechange = function() {
          if (this.readyState == 4) {
            let content = document.querySelector("#body-content");
            if (this.status == 200) {
                content.innerHTML = req.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>not found</p>";
            } else {
                content.innerHTML = "<p>not found</p>";
            }
          }
      };
    req.open("GET", `pages/${page}.html`, true);
    req.send();
    }

    function navigate() {
      const req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status != 200) return;
                  
          document.querySelectorAll(".navbar, .sidenav").forEach(function(e) {
            e.innerHTML = req.responseText;
          });
                  
          document.querySelectorAll(".sidenav a, .navbar a").forEach(function(e) {
            e.addEventListener("click", function(event) {
              
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
                      
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
        }
      };
      req.open("GET", "nav.html", true);
      req.send();
    }
  });
 
  

    