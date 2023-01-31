function CreateFAQsCollapsable() {

    console.log("Createing Collabsable...");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", './recources/special-content/PageOnly-FAQ/scripts/faq.json', true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            const faqs = JSON.parse(xhr.responseText);
            
            for(var i = 0; i < faqs.FAQ.length; i++) {

                console.log("Cyceling...");

                var faq = faqs.FAQ[i]; 

                var collapsable = document.createElement("button");

                collapsable.type = 'button';

                collapsable.style.width = '70%';
                collapsable.style.padding = '2.5%';
                collapsable.style.margin = '15%';
                collapsable.style.marginBottom = '0';
                collapsable.style.marginTop = '5%';

                collapsable.style.backgroundColor = 'dodgerblue';
                collapsable.style.borderRadius = '1rem';

                collapsable.style.boxShadow = '0 0 25px rgba(0, 0, 0, 0.3)';

                collapsable.style.color = 'white';
                collapsable.style.fontSize = '3vw';

                collapsable.style.border = '0';
                collapsable.style.transition = '0.2s'
                
                collapsable.addEventListener("mouseover", function() {
                    if(this.id != "open") {
                        this.style.backgroundColor = 'cornflowerblue';
                    }
                    else {
                        this.backgroundColor = 'dodgerblue';
                    }
                })
                collapsable.addEventListener("mouseleave", function() {
                    this.style.backgroundColor = 'dodgerblue';
                })

                collapsable.textContent = faq.q;

                collapsable.addEventListener("click", function() {
                    var next = this.nextElementSibling;
                    if(next.style.display != 'flex') {
                        next.style.display = 'flex';
                        this.id = "open";
                        this.style.backgroundColor = 'dodgerblue';
                        this.style.borderBottomLeftRadius = '0';
                        this.style.borderBottomRightRadius = '0';
                        this.style.boxShadow = '0 0 0px rgba(0, 0, 0, 0)';
                    } else {
                        next.style.display = 'none';
                        this.id = "close"
                        this.style.backgroundColor = 'cornflowerblue';
                        this.style.borderBottomLeftRadius = '1rem';
                        this.style.borderBottomRightRadius = '1rem';
                        this.style.boxShadow = '0 0 25px rgba(0, 0, 0, 0.3)';
                    }
                })

                var A_container = document.createElement("div");

                A_container.style.width = '70%';
                A_container.style.height = '30%'
                A_container.style.backgroundColor = 'dodgerblue';
                A_container.style.borderBottomRightRadius = '1rem'
                A_container.style.borderBottomLeftRadius = '1rem';

                A_container.style.display = 'none';
                A_container.style.transition = 'max-height 0.2s ease-out';
                A_container.style.marginLeft = '15%';
                A_container.style.marginRight = '15%';

                var A = document.createElement("a");

                A.style.width = '80%'
                A.style.height = '80%'
                A.style.margin = '5%'
                A.style.backgroundColor = 'white';
                A.style.borderRadius = '1rem'
                A.style.padding = '5%';

                A.style.display = 'flex';
                A.style.justifyContent = 'center';
                A.style.alignItems = 'center';
                A.style.textAlign = 'center';

                A.style.color = 'dodgerblue';
                A.style.boxShadow = '0 0 25px rgba(0, 0,0, 0.3) inset'

                A.textContent = faq.a;

                document.getElementById("faq-container").appendChild(collapsable);
                A_container.appendChild(A);
                document.getElementById("faq-container").appendChild(A_container);

                console.log("Appended!");
            }
        }

    }    
    xhr.send(null);
}
