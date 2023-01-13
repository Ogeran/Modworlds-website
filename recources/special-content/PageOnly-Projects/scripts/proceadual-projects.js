function UpdateProjects() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", './recources/special-content/PageOnly-Projects/scripts/projects.json', true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            const projects = JSON.parse(xhr.responseText);
            console.log(projects);

            for(var i = 0; i < projects.Projects.length; i++) {
                const project = projects.Projects[i];

                const e = document.createElement("div");

                e.style.width = '85%'
                e.style.height = '20%'
                e.style.backgroundImage = `url(${project.back})`;
                e.style.backgroundRepeat = 'no-repeat';
                e.style.backgroundSize = 'cover';
                e.style.backgroundAttachment = 'fixed';
                
                e.style.display = 'flex';
                e.style.flexWrap = 'nowrap'

                e.style.marginTop = '15%';
                e.style.marginBottom = '15%';
                e.style.marginLeft = '7.5%';

                e.style.borderRadius = '10000px';

                e.style.justifyContent = 'center';
                e.style.alignItems = 'center';

                const e_img = document.createElement("img");

                e_img.src = project.PB;
                e_img.style.borderRadius = '10000px';
                e_img.style.width = '20%'
                e_img.style.height = '20%';
                e_img.style.margin = '2.5%'
                e_img.style.aspectRatio = '1/1'

                const e_textContainer = document.createElement("div");

                e_textContainer.style.display = 'flex';
                e_textContainer.style.flexWrap = 'wrap';
                e_textContainer.style.height = '100%';
                e_textContainer.style.width = '75%'

                const e_title = document.createElement("a");

                e_title.textContent = project.name;
                e_title.style.color = '#ffffff';
                e_title.style.fontSize = '7.5vw';
                e_title.style.width = '90%';
                e_title.style.height = '10%';
                e_title.style.textAlign = 'center';
                e_title.style.margin = '2.5%';

                const e_description = document.createElement("a");

                e_description.style.height = '75%'
                e_description.style.width = '90%';
                e_description.style.margin = '2.5%';
                e_description.style.textAlign = 'center';
                e_description.style.color = '#ffffff';
                e_description.textContent = project.description;

                e_textContainer.appendChild(e_title);
                e_textContainer.appendChild(e_description);

                e.appendChild(e_img);
                e.appendChild(e_textContainer);
                document.getElementById("back").appendChild(e);
            }
        }
    }
    xhr.send(null);
}