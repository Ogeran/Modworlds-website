function LoadMemberCards() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", './recources/special-content/PageOnly-AboutUs/scripts/team.json', true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            const team = JSON.parse(xhr.responseText);
            for(var i = 0; i < team.Members.length; i++) {
                var member = team.Members[i];
                var e = document.createElement("div");

                e.style.width = '95%';
                e.style.backgroundImage = `url(${member.Back})`
                e.style.backgroundRepeat = 'no-repeat';
                e.style.backgroundSize = 'cover';
                e.style.backgroundAttachment = 'fixed';

                e.style.display = 'flex';
                e.style.flexWrap = 'nowrap';

                var e_img = document.createElement("img");

                e_img.src = member.PB;
                e_img.style.borderRadius = '50%';
                e_img.style.width = '15%';
                e_img.style.height = '15%';
                e_img.style.margin = '2.5%';

                var e_textContainer = document.createElement("div");

                e_textContainer.style.display = 'flex';
                e_textContainer.style.flexWrap = 'wrap';
                e_textContainer.style.width = '80%';

                var e_title = document.createElement("a");

                e_title.style.color = '#ffffff';
                e_title.style.textAlign = 'center';
                e_title.style.width = '100%';
                e_title.style.fontSize = '2.5rem';
                e_title.style.margin = '0';
                e_title.style.marginTop = '1rem';

                e_title.textContent = member.Title;

                var e_description = document.createElement("a");

                e_description.style.color = '#ffffff';
                e_description.style.textAlign = 'center';
                e_description.style.width = '95%';
                e_description.style.marginRight = '5%';

                e_description.textContent = member.Description;

                if(i != 0) {
                    e.style.marginTop = '20%';

                    if(i % 2 == 0) {
                        e.style.borderTopLeftRadius = '10000px';
                        e.style.borderBottomLeftRadius = '10000px';
                        e.style.marginLeft = '5%';
    
                        e_textContainer.appendChild(e_title);
                        e_textContainer.appendChild(e_description);
                        e.appendChild(e_img);
                        e.appendChild(e_textContainer);
                    }
                    else {
                        e.style.borderTopRightRadius = '10000px';
                        e.style.borderBottomRightRadius = '10000px';
                        e.style.marginRight = '5%';
    
                        e_textContainer.appendChild(e_title);
                        e_textContainer.appendChild(e_description);
                        e.appendChild(e_textContainer);
                        e.appendChild(e_img);
                    }
                    document.getElementById("member_cards").appendChild(e);
                }
                else {
                    var container = document.createElement("div");

                    container.style.width = '100%';
                    container.style.paddingTop = '20%';
                    
                    e.style.borderTopLeftRadius = '10000px';
                    e.style.borderBottomLeftRadius = '10000px';
                    e.style.marginLeft = '5%';

                    e_textContainer.appendChild(e_title);
                    e_textContainer.appendChild(e_description);
                    e.appendChild(e_img);
                    e.appendChild(e_textContainer);

                    container.appendChild(e);

                    document.getElementById("member_cards").appendChild(container);
                }
            }
        }
    }
    xhr.send(null);
}