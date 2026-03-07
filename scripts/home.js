const cardContainer = document.getElementById("card-container");

async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    console.log(res);
    const data = await res.json()
   displayIssues(data.data);
}

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

function renderLabels(labels) {

    const labelHTMLArray = labels.map(label => {
        return `<div class="badge badge-warning badge-soft badge-outline">${label}</div>`;
    });

    return labelHTMLArray.join(" ");
}

function getStatusImage(status) {
    if (status === 'open') {
        return './assets/open-status.png';
    }else if(status === 'closed') {
        return './assets/Closed- Status .png';
    };
}

function getStatusBorder(status) {
    if (status.toLowerCase() === 'open') {
        return 'border-green-500';  
    } else if (status.toLowerCase() === 'closed') {
        return 'border-purple-500';   
    }      
}

function getPriorityBadge(priority) {
    priority = priority.toUpperCase().trim();
    if(priority === "HIGH") return `<div class="badge badge-error badge-soft">${priority}</div>`;
    else if(priority === "MEDIUM") return `<div class="badge badge-warning badge-soft">${priority}</div>`; 
    else if(priority === "LOW") return `<div class="badge badge-Neutral badge-soft">${priority}</div>`; 
    
}

function displayIssues(issues) {

    issues.forEach(issue => {

        const div = document.createElement("div");

        const priorityBadge = getPriorityBadge(issue.priority);

        div.className = `card bg-base-100 border-t-4 ${getStatusBorder(issue.status)} shadow`;

        div.innerHTML = `
        <div class="card-body p-4">

          <div class="flex justify-between">
            <img src="${getStatusImage(issue.status)}" alt="">
           ${priorityBadge}
          </div>

          <h3 class="font-semibold mt-2">
            ${issue.title}
          </h3>

          <p class="text-sm text-gray-500">
            ${issue.description}
          </p>

          <div class="flex gap-2 mt-2">
            ${renderLabels(issue.labels)}
          </div>

        </div>

        <div class="border-t p-3 text-xs text-gray-500 space-y-2">
          <p>#${issue.id} by ${issue.author || "john_doe"}</p>
          <p>${issue.date || "1/15/2024"}</p>
        </div>
        `;

        cardContainer.appendChild(div);

    });

}

loadIssues();